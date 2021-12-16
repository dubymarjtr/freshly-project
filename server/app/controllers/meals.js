import config from "../config.js";
import client from "../db/conns/client.js";

const meals = client.db(config.db.name).collection("meals");

export default {
  // Get all meals with optional filters
  async index(req) {
    const keys = Object.keys(req.query);
    const values = Object.values(req.query);

    const mealsData = await meals.find({}).toArray();

    function filterMeals(meals, keys, values) {
      let index;
      if (keys.includes("keywords")) {
        index = keys.indexOf("keywords");
        meals = meals.filter(
          (meal) =>
            meal.title.includes(values[index]) ||
            meal.description.includes(values[index]) ||
            meal.ingredients.includes(values[index])
        );
      }
      if (keys.includes("diet-type")) {
        index = keys.indexOf("diet-type");
        meals = meals.filter((meal) => meal.diet.includes(values[index]));
      }
      return meals;
    }

    return filterMeals(mealsData, keys, values);
  },
  // Get meal by id (dynamic route)
  show(id) {
    return meals.findOne({ _id: Number(id) });
  },
};
