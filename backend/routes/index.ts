import express from "express";
import apiRouter from "./api";
import path from "node:path";

const router = express.Router({ caseSensitive: true, strict: true });

router.use("/api", apiRouter);
// Static routes
// Serve React build files in production

if (process.env.NODE_ENV === "production") {
    router.get("/", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../../../frontend", "dist", "index.html")
        );
    });

    router.use(express.static(path.resolve("../../frontend/dist")));

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                "../../../frontend",
                "dist",
                req.path.slice(1)
            )
        );
    });
}

export default router;
