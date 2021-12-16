import { Router } from "express";
import mealsController from "../controllers/meals.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Take a look at our Freshly Cooked Meals!");
});

router.post("/", async (_, res) => {
  // Get all meals from controller
  const meals = await mealsController.index();
  res.json(meals);
});

export default router;
