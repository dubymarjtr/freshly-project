import { Router } from "express";
import mealsController from "../controllers/meals.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Take a look at our Freshly Cooked Meals!");
});

// get all meals with optional filters
router.post("/", async (req, res) => {
  if (req.isAuth?.role === "ADMIN") {
    try {
      const meals = await mealsController.index(req);
      res.json(meals);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// get meal by id (dynamic route)
router.post("/:id", async ({ isAuth, params }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      const meal = await mealsController.show(params.id);
      res.json(meal);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

export default router;
