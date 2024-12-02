import { Router } from "express";
import apiRouter from "./api";
import path from "node:path";

const router = Router({ caseSensitive: true, strict: true });

router.use("/api", apiRouter);
// Static routes
// Serve React build files in production

export default router;
