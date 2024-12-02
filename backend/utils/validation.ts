import { NextFunction, Request, Response } from "express";
import {
    FieldValidationError,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import { AuthenticationError } from "../types";

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
export const handleValidationErrors = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors: Record<string, string> = {};
        (validationErrors as Result<FieldValidationError>)
            .array()
            .forEach((error) => (errors[error.path] = error.msg));

        const err = new AuthenticationError("Bad request");
        err.errors = errors;
        err.status = 400;
        next(err);
    }
    next();
};
