import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import config from "../config";
import prisma from "../prisma";

import type { NextFunction } from "express";
import {
    type UserResponse,
    type User,
    type UserRequest,
    AuthenticationError,
} from "../types";

const {
    jwtConfig: { expiresIn, secret },
} = config;

// Sends a JWT Cookie
export const setTokenCookie = (res: UserResponse, user: User) => {
    if (!secret || !expiresIn) return;
    // Create the token

    const oneWeek /* In Seconds */ = parseInt(expiresIn);
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const token = jwt.sign({ data: safeUser }, secret, {
        expiresIn: oneWeek,
    });

    res.cookie("token", token, {
        maxAge: oneWeek * 1000, // Now in milliseconds
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return token;
};

export const restoreUser = (
    req: UserRequest,
    res: UserResponse,
    next: NextFunction
) => {
    if (!secret) return;
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, undefined, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = (jwtPayload as JwtPayload).data;

            req.user = await prisma.owners.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                },
            });
        } catch (e) {
            res.clearCookie("token");
            return next();
        }

        if (!req.user) res.clearCookie("token");

        return next();
    });
};

export const requireAuth = (
    req: UserRequest,
    _res: UserResponse,
    next: NextFunction
) => {
    if (req.user) return next();

    const err = new AuthenticationError("Authentication error");
    err.errors = { message: "Authentication error" };
    err.status = 401;

    return next(err);
};
