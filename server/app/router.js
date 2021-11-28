import Router from "express";
import client from "./db/conns/client.js";

const collection = client.db("freshly").collection("meals");

const router = new Router();

// localhost:3000/api
router.get("/", (_, res) => {
    res.send("Hello from API router");
});

  // get all meals
router.get("/meals", async (_, res) => {
    const meals = await collection.find({}).toArray();
    res.json(meals);
});

// get meal by id (dynamic route)
router.get("/meals/:id", async (req, res) => {
    const meal = await collection.findOne({ _id: Number(req.params.id) });
    console.log(meal);
    res.json(meal);
});
export default router;
