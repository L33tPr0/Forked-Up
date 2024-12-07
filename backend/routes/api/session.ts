import { NextFunction, Request, Response, Router } from "express";
import { User, UserRequest, UserResponse } from "../../types";
import prisma from "../../prisma";
import { hashSync, compareSync } from "bcryptjs";
import { setTokenCookie } from "../../utils/auth";

const router = Router({ caseSensitive: true, strict: true });

router.get("/", (req, res, next) => {
    console.log("REQUEST BODY FROM /API/SESSION ===> ", req.body);
    const { user } = req as UserRequest;
    if (!user) {
        res.json(null);
    } else {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        res.json(safeUser);
    }
});

router.post("/login", async (req, res, next) => {
    const { password, username } = req.body;
    console.log(password, username);
    if (!password || !username) {
        res.status(400).json({
            message: "Missing login credentials in request body",
        });
    }
    const user = await prisma.owner.findUnique({
        where: {
            username,
        },
    });

    if (!user || !compareSync(password, user.hashedPassword.toString())) {
        return next();
    }

    const safeUser = {
        id: user?.id,
        email: user?.email,
        username: user?.username,
        avatar: user?.avatar,
    };

    await setTokenCookie(res as UserResponse, safeUser as User);

    res.json(safeUser);
});

router.post("/signup", async (req, res, next) => {
    console.log("REQUEST BODY FROM /API/SESSION/SIGNUP ===> ", req.body);
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.owner.findUnique({
            where: {
                email,
            },
        });

        if (!existingUser) {
            const userData = await prisma.owner.create({
                data: {
                    username,
                    email,
                    hashedPassword: hashSync(password),
                },
            });
            res.status(201).json(userData);
        }
    } catch (e) {
        res.status(500).json({
            message: "This user already exists.",
            error: e,
        });
    }
});

router.delete("/", (req, res, next) => {
    console.log("REQUEST BODY FROM /API/SESSION/LOGOUT ===> ", req.body);
    res.clearCookie("token").json({ message: "success" });
});

export default router;
