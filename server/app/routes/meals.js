import { Router } from "express";
import mealsController from "../controllers/meals.js";
import Meal from "../models/users/Meal.js";

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

// delete a meal
router.delete("/:id", async ({ isAuth, params }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      const deletedMeal = await mealsController.delete(params.id);
      res.json(deletedMeal);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// create a new meal
router.put("/create", async ({ isAuth, body }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      // create meal instance
      const meal = new Meal(body);

      // validate meal
      const errors = meal.validate();

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }
      const newMeal = await mealsController.create(body);
      res.status(201).json(newMeal);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// update a meal
router.put("/:id", async ({ isAuth, params, body }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      const updatedMeal = await mealsController.update(params.id, body);
      res.json(updatedMeal);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

export default router;
