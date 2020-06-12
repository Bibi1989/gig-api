import { Router } from "express";
import {
  createUsers,
  getUsers,
  loginUser,
} from "../controllers/user_controller";

const router = Router();

router.post("/register", async (req, res) => {
  const body = req.body;
  const user = await createUsers(body);
  if (user.status === "error") {
    res.status(400).json(user);
  }
  res.header("auth", user.token);
  res.json(user);
});
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await loginUser(body);
  if (user.status === "error") {
    res.status(400).json(user);
  }
  res.header("auth", user.token);
  res.json(user);
});
router.get("/users", async (_req, res) => {
  const users = await getUsers();
  res.json(users);
});

export default router;
