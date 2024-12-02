import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthenticationError } from "./types";
import config from "./config";

const app = express();
const IS_PRODUCTION = config.environment === "production";

/* CONFIGURATIONS */
app.use(express.json());
app.use(helmet());
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
if (!IS_PRODUCTION) {
    // enable cors only in development
    app.use(cors());
}

/* ROUTES */

app.use(routes);

app.use((_req, _res, next: NextFunction) => {
    const err = new AuthenticationError(
        "The requested resource couldn't be found"
    );
    err.status = 404;
    err.errors = { message: "The requested resource couldn't be found" };

    next(err);
});

app.use(
    (
        err: AuthenticationError,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
            stack: IS_PRODUCTION ? undefined : err.stack,
        });
    }
);

export default app;
