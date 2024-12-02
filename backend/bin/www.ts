#!/usr/bin/env node
//backend/bin/www
require("dotenv").config();
import app from "../app";
import prisma from "../prisma";
import config from "../config";

prisma.$connect().then(() => {
    console.log(`app is listening on port ${config.port}`);
    app.listen(config.port);
});
