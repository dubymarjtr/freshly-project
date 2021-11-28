import Router from "express";
import client from "./db/conns/client.js";

const collection = client.db("freshly").collection("meals");

const router = new Router();

// localhost:3000/api
router.get("/", (_, res) => {
  res.send("Hello from API router");
});

// get all meals with optional filters
router.get("/meals", async (req, res) => {
  const keys = Object.keys(req.query);
  const values = Object.values(req.query);

  const meals = await collection.find({}).toArray();

  function filterMeals(meals, keys, values) {
      let index;
      if(keys.includes('keywords'))
      {
          index = keys.indexOf('keywords')
          meals = meals.filter(meal => meal.title.includes(values[index]) ||
          meal.description.includes(values[index]) || 
          meal.ingredients.includes(values[index]))
      }
      if(keys.includes('diet-type'))
      {
          index = keys.indexOf('diet-type');
          meals = meals.filter(meal => meal.diet.includes(values[index]));
      }
      return meals;
  }

  const filteredMeals = filterMeals(meals, keys, values);
  res.json(filteredMeals);
})


// get meal by id (dynamic route)
router.get("/meals/:id", async (req, res) => {
    const meal = await collection.findOne({ _id: Number(req.params.id) });
    console.log(meal);
    res.json(meal);
});

// create a new meal
router.post("/meals", async (req,res) => {
  const newMeal = await collection.insertOne(req.body);
  res.json(newMeal);
})

// update a meal
router.put("/meals/", async (req, res) => {
  const updatedMeal = await collection.updateOne({ _id: Number(req.body.id)},
  { $set: req.body.payload });
  res.json(updatedMeal);
})

// delete a meal
router.delete("/meals/:id", async (req, res) => {
  const deletedMeal = await collection.deleteOne({ _id: Number(req.params.id) });
  res.json(deletedMeal);
});

export default router;
