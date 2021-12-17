import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import client from "../db/conns/client.js";

const customer = client.db(config.db.name).collection("customer");
const meals = client.db(config.db.name).collection("meals");

export default {
  // Create customer account
  async create({ fname, lname, address, username, password, role }) {
    const existingUser = await customer.findOne({ username });

    // Check if user already exists
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer and insert into database
    return customer.insertOne({
      firstName: fname,
      lastName: lname,
      address,
      username,
      password: hashedPassword,
      role,
    });
  },

  async show({ username, password }) {
    const customerUser = await customer.findOne({ username });

    if (!customerUser) {
      throw new Error("Login unsuccessful");
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, customerUser.password);

    if (!match) {
      throw new Error("Login unsuccessful");
    }

    // Create JWT
    return jwt.sign(
      { username, role: customerUser.role },
      config.encryption.secret,
      {
        expiresIn: config.encryption.expiresIn,
      }
    );
  },

  // Place an order
  async order(ids) {
    let pricePerMeal;

    // number of meals should be 4, 6, 8, or 10
    if (
      ids.length !== 4 &&
      ids.length !== 6 &&
      ids.length !== 8 &&
      ids.length !== 10
    ) {
      throw new Error("Please select 4, 6, 8, or 10 meals");
    }

    // assign price depending on number of meals
    if (ids.length === 4) {
      pricePerMeal = 10.99;
    } else if (ids.length === 6) {
      pricePerMeal = 8.99;
    } else if (ids.length === 8) {
      pricePerMeal = 6.99;
    } else if (ids.length === 10) {
      pricePerMeal = 4.99;
    }

    // retrieve meals from database
    const mealsData = await meals.find({}).toArray();
    const selectedMeals = mealsData.filter((meal) => ids.includes(meal._id));

    // create array with meals titles only
    const mealsTitles = selectedMeals.map((meal) => meal.title);

    // create receipt object with meals titles and total price
    const receipt = {
      meals: mealsTitles,
      unitPrice: `${ids.length} x $${pricePerMeal}`,
      total: `$${ids.length * pricePerMeal}`,
    };

    return receipt;
  },
};
