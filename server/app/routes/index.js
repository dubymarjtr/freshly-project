import { Router } from "express";
import adminRouter from "./admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello from API");
});

router.use("/admin", adminRouter);

export default router;
