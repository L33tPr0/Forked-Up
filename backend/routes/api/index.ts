import { Router } from "express";
import sessionRouter from "./session";
import { restoreUser } from "../../utils/auth";
import restaurantRouter from "./restaurants";
const router = Router({ caseSensitive: true, strict: true });

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/restaurants", restaurantRouter);
export default router;
