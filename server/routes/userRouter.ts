import express from "express";
import { login, register, logout } from "../controllers/userControllers";
import { errorHandlerMiddleware } from "../middleware/errorHandler";
const userRouter = express.Router();

userRouter.post("/login", login, errorHandlerMiddleware);
userRouter.post("/register", register, errorHandlerMiddleware);
userRouter.post("/logout", logout, errorHandlerMiddleware);

export default userRouter;
