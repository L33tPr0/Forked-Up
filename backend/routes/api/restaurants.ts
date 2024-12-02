import { NextFunction, Request, Response, Router } from "express";
import { User, UserRequest, UserResponse } from "../../types";
import prisma from "../../prisma";

const router = Router({ strict: true, caseSensitive: true });

// GET all the restaurants
router.get("/", async (req, res, next) => {
    const restaurants = await prisma.restaurant.findMany();
    if (!restaurants)
        res.status(400).json({ message: "No restaurants were found" });
    console.log(restaurants);
    res.status(200).json(restaurants);
});

// GET a specific restaurant and include it's menu and inventory
router.get("/:id", (req, res, next) => {});

export default router;
