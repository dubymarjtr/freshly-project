import Router from "express";
import client from "./db/conns/client.js";

const collection = client.db("freshly").collection("meals");

const router = new Router();

// localhost:3000/api
router.get("/", (_, res) => {
    res.send("Hello from API router");
});

  // localhost:3000/meals
router.get("/meals", async (_, res) => {
    const meals = await collection.find({}).toArray();
    res.json(meals);
});

export default router;
