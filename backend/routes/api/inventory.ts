import { Router } from "express";
import { UserRequest } from "../../types";
import prisma from "../../prisma";

const router = Router({ caseSensitive: true, strict: true });

router.post("/:id/ingredients", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(403).json({
            message: "You must be signed in to add an ingredient",
        });
    }

    try {
        const id = parseInt(req.params.id);

        const ingredient = await prisma.inventory.update({
            where: {
                restaurant_id: id,
            },
            data: {
                ingredient: {
                    create: { ...req.body },
                },
            },
        });
        res.status(201).json({ message: "Successful creation", ingredient });
    } catch (e) {
        res.status(500).json({ message: "Internal Server error", error: e });
    }
});
router.put("/:id/ingredients/:ingredientId", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(403).json({
            message: "You must be signed in to add an ingredient",
        });
    }

    try {
        const id = parseInt(req.params.id);
        const ingredientId = parseInt(req.params.ingredientId);

        const ingredients = await prisma.inventory.update({
            where: {
                restaurant_id: id,
            },
            data: {
                ingredient: {
                    update: {
                        where: {
                            id: ingredientId,
                        },
                        data: {
                            ...req.body,
                        },
                    },
                },
            },
        });
        res.status(200).json();
    } catch (e) {
        res.status(500).json({ message: "Internal Server error", error: e });
    }
});

router.get("/:id", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(401).json({
            message: "You must be signed in to make this request",
        });
    }
    try {
        const id = parseInt(req.params.id);

        const record = await prisma.inventory.findUnique({
            where: {
                restaurant_id: id
            },
            include: {
                ingredient: true,
            },
        });

        res.status(200).json(record?.ingredient);
    } catch (e) {
        res.status(500).json({ message: "Internal Server error", error: e });
    }
});

export default router;
