#!/usr/bin/env node
//backend/bin/www
require("dotenv").config();
import app from "../app";

app.listen(process.env.PORT || 3001);
