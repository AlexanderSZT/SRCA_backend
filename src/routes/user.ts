import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userController from "../controllers/userController";

dotenv.config();

const userRouter = Router();

userRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
	const time = new Date().toUTCString();
	console.log("Time: ", time);
	next();
});

userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);

export { userRouter };