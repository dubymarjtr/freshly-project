import { Router } from "express";
import adminController from "../controllers/admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello from Administrator");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  adminController.create(username, password);
  res.send("Post request");
});

export default router;
