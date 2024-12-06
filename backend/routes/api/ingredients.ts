import { Router } from "express";
import { UserRequest } from "../../types";
import prisma from "../../prisma";

const router = Router({ caseSensitive: true, strict: true });

router.delete("/:id", async (req, res, next) => {
    const user = (req as UserRequest).user;
    if (!user) {
        res.status(403).json({
            message: "You must be signed in to delete an ingredient",
        });
    }
    const id = parseInt(req.params.id);

    try {
        const deletedRecord = await prisma.ingredient.delete({
            where: {
                id,
            },
        });

        res.status(200).json(deletedRecord.id);
    } catch (e) {
        res.status(500).json({ message: "Internal Server error", error: e });
    }
});

router.post("/", async (req, res, next) => {
    const user = (req as UserRequest).user;

    if (!user) {
        res.status(403).json({
            message: "You must be signed in to add an ingredient",
        });
    }

    try {
        const newIngredient = await prisma.ingredient.create({
            data: {
                ...req.body,
            },
        });
        console.log(newIngredient);
        res.status(201).json(newIngredient);
    } catch (e) {
        res.status(500).json({ message: "Internal Server error", error: e });
    }
});

export default router;
