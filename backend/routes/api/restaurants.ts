import { NextFunction, Request, Response, Router } from "express";
import { User, UserRequest, UserResponse } from "../../types";
import prisma from "../../prisma";

const router = Router({ strict: true, caseSensitive: true });

// GET all the restaurants on sale or owned by the user.
router.get("/", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(401).json({
            message: "You must be signed in to make this request",
        });
    } else {
        const forSale = await prisma.restaurant.findMany({
            where: {
                is_for_sale: {
                    equals: true,
                },
            },
        });

        const owned = await prisma.restaurant.findMany({
            where: {
                owner_id: {
                    equals: user.id,
                },
            },
        });
        res.status(200).json([...forSale, ...owned]);
    }
});

// GET a specific restaurant and all it's details
router.get("/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        next();
    }

    const targRestaurant = await prisma.restaurant.findUnique({
        where: {
            id,
        },
        include: {
            inventory: {
                include: {
                    ingredient: true,
                },
            },
            menu: true,
            owner: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    avatar: true,
                },
            },
        },
    });

    console.log(targRestaurant);

    if (!targRestaurant) {
        res.status(404).json({
            message: "The requested restaurant does not exist",
        });
    } else {
        res.status(200).json(targRestaurant);
    }
});

// PUT "Sell" a restaurant
router.put("/:id/sell", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(401).json({
            message: "You must be signed in to make this request",
        });
    } else {
        const id = parseInt(req.params.id, 10);
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id,
            },
        });
        if (!restaurant) {
            res.status(404).json({
                message: "The restaurant to sell does not exist",
            });
        } else if (restaurant.owner_id !== user.id) {
            res.status(403).json({
                message: "You can't sell restaurants you do not own",
            });
        } else {
            const soldRestaurant = await prisma.restaurant.update({
                data: {
                    is_for_sale: true,
                    owner_id: null,
                },
                where: {
                    id,
                },
            });

            res.status(200).json(soldRestaurant);
        }
    }
});

//PUT "Buy" a restaurant
router.put("/:id/buy", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(401).json({
            message: "You must be signed in to make this request",
        });
    } else {
        const id = parseInt(req.params.id);

        const restaurantToBuy = await prisma.restaurant.findUnique({
            where: {
                id,
            },
        });

        console.log(restaurantToBuy);

        if (!restaurantToBuy) {
            res.status(404).json({
                message: "The restaurant to buy doesn't exist",
            });
        } else if (restaurantToBuy.owner_id !== null) {
            res.status(403).json({
                message:
                    "You can only buy restaurants that don't have an owner",
            });
        } else {
            const updatedRecord = await prisma.restaurant.update({
                data: {
                    is_for_sale: false,
                    owner_id: user.id,
                },
                where: {
                    id,
                },
            });

            res.status(200).json(updatedRecord);
        }
    }
});

// DELETE Purge a restaurant from the database via its ID
router.delete("/:id", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(401).json({
            message: "You must be signed in to make this request",
        });
    } else {
        const id = parseInt(req.params.id);

        // Check it exists first
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id,
            },
        });

        if (!restaurant) {
            res.status(404).json({
                message: "The restaurant to delete couldn't be found",
            });
        } else if (restaurant.owner_id !== user.id) {
            res.status(403).json({
                message:
                    "You can only delete restaurants that are owned by you.",
            });
        } else {
            const record = await prisma.restaurant.delete({
                where: {
                    id,
                },
            });

            res.status(200).json(record.id);
        }
    }
});

// POST Add a restaurant to the collection of restaurants
router.post("/", async (req, res, next) => {
    const user = (req as UserRequest).user;

    if (!user) {
        res.status(403).json({
            message: "You must be signed in to add a restaurant",
        });
    } else {
        const { owner_id } = req.body;

        if (user.id !== owner_id) {
            res.status(403).json(
                "You can't create a new restaurant through a different user"
            );
        } else {
            try {
                const newRecord = await prisma.restaurant.create({
                    data: {
                        ...req.body,
                    },
                });

                
                if (newRecord) {
                    console.log(newRecord);
                    await prisma.inventory.create({
                        data: {
                            restaurant_id: newRecord.id,
                        }
                    })
                    res.status(201).json(newRecord);
                }
            } catch (e) {
                res.status(500).json({
                    message: "Internal System error",
                    error: e,
                });
            }
        }
    }
});

export default router;
