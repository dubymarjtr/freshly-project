import config from "../config.js";
import client from "../db/conns/client.js";

const meals = client.db(config.db.name).collection("meals");

export default {
  // Get all meals
  index() {
    return meals.find({}).toArray();
  },
};
