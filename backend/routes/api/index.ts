import { Router } from "express";
import sessionRouter from "./session";
import { restoreUser } from "../../utils/auth";
import restaurantRouter from "./restaurants";
import ingredientsRouter from "./ingredients";
import inventoriesRouter from "./inventory";
const router = Router({ caseSensitive: true, strict: true });

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/restaurants", restaurantRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/inventories", inventoriesRouter);

export default router;
