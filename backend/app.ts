import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthenticationError } from "./types";
import config from "./config";

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

/* CONNECT */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
