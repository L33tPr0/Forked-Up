import { NextFunction, Request, Response, Router } from "express";
import { User, UserRequest, UserResponse } from "../../types";
import { hashSync, compareSync } from "bcryptjs";
import { setTokenCookie } from "../../utils/auth";
import prisma from "../../prisma";

const router = Router({ caseSensitive: true, strict: true });

router.get("/", (req, res, next) => {
    console.log("REQUEST BODY FROM /API/SESSION ===> ", req.body);
    const { user } = req as UserRequest;
    if (!user) res.json(null);
    const safeUser = {
        id: user?.id,
        email: user?.email,
        username: user?.username,
    };
    res.json(safeUser);
});

router.post("/login", async (req, res, next) => {
    const { password, username } = req.body;
    const user = await prisma.owner.findUnique({
        where: {
            username,
        },
    });
    if (!user || !compareSync(password, user.hashedPassword.toString())) {
        next();
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

    const existingUser = await prisma.owner.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) res.status(400).json({ message: "User already exists." });
    const userData = await prisma.owner.create({
        data: {
            username,
            email,
            hashedPassword: hashSync(password),
        },
    });
    res.status(201).json(userData);
});

router.delete("/", (req, res, next) => {
    console.log("REQUEST BODY FROM /API/SESSION/LOGOUT ===> ", req.body);
    res.clearCookie("token").json({ message: "success" });
});

export default router;
