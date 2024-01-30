import express from "express";
import { login, register } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.post("/register", register);

export default userRouter;
