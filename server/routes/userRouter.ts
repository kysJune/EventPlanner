import express from 'express';
const userRouter = express.Router();
import {login, register} from "../controllers/userControllers";



userRouter.get("/login", login);
userRouter.post("/register", register);

export default userRouter;