import { Response, Request } from "express";

export interface User {
    id: string;
    email: string;
    username: string;
}

export interface UserResponse extends Response {
    user?: User | null;
}

export interface UserRequest extends Request {
    user?: User | null;
}

export class AuthenticationError extends Error {
    status: number | undefined;
    errors: {} | undefined;
    constructor(message: string) {
        super(message);
    }
}
