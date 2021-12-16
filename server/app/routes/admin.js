import { Router } from "express";
import adminController from "../controllers/admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello from Administrator");
});

// Create admin
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // create admin using controller
    await adminController.create(username, password);

    // save JWT after registering admin
    const token = await adminController.show(username, password);
    res.send(token);
  } catch ({ message }) {
    res.status(400).json(message);
  }
});

export default router;
