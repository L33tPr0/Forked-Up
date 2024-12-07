import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config";
import { UserResponse } from "./types";

require("dotenv").config();
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

app.use(
    "/*",
    (err: Error, req: Request, res: UserResponse, next: NextFunction) => {
        res.status(500).json({ message: err.message });
    }
);

/* CONNECT */

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
});
