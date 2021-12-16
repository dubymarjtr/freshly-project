import { Router } from "express";
import adminController from "../controllers/admin.js";
import Admin from "../models/users/Admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello from Administrator");
});

// Create admin
router.post("/register", async (req, res) => {
  try {
    // create admin instance
    const admin = new Admin(req.body);
    // create admin using controller
    await adminController.create(admin);

    // save JWT after registering admin
    const token = await adminController.show(admin);
    res.send(token);
  } catch ({ message }) {
    res.status(400).json(message);
  }
});

export default router;
