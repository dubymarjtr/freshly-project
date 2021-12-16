import { Router } from "express";
import Customer from "../models/users/Customer.js";
import customerController from "../controllers/customer.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello! Welcome to our store!");
});

// create customer
router.post("/register", async (req, res) => {
  try {
    // create admin instance
    const customer = new Customer(req.body);

    const errors = customer.validate();

    if (errors.length) {
      throw new Error(errors.join("\n"));
    }

    // create admin using controller
    await customerController.create(customer);

    // save JWT after registering admin
    const token = await customerController.show(customer);
    res.send(token);
  } catch ({ message }) {
    res.status(400).json(message);
  }
});

// Login customer
router.post("/login", async ({ body }, res) => {
  try {
    await customerController.show(body);
    res.send(`Welcome, ${body.username}!`);
  } catch ({ message }) {
    res.status(400).json(message);
  }
});

export default router;
