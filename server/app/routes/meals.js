import { Router } from "express";
import mealsController from "../controllers/meals.js";
import isAuth from "../middleware/isAuth.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Take a look at our Freshly Cooked Meals!");
});

router.post("/", async (req, res) => {
  if (req.isAuth) {
    const meals = await mealsController.index(req);
    res.json(meals);
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

export default router;
