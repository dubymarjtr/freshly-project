import { Router } from "express";
import adminRouter from "./admin.js";
import mealsRouter from "./meals.js";
import customerRouter from "./customer.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello from API");
});

router.use("/admin", adminRouter);
router.use("/meals", mealsRouter);
router.use("/customer", customerRouter);

export default router;
