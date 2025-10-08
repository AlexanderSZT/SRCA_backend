import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schemas/User";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const requireSignin = async (req: any, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Authorization token missing or invalid" });
		}

		const token = authHeader.split(" ")[1];
		const verifyToken: any = jwt.verify(token, JWT_SECRET);
		const rootUser = await User.findOne({ username: verifyToken.username });
		
		if (!rootUser) {
			throw new Error("User not found");
		}

		req.user = rootUser;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized access", error });
	}
};

export const checkAdmin = (req: any, res: Response, next: NextFunction) => {
	if (req.user?.role !== "admin") {
		return res.status(403).json({ message: "Admin access required" });
	}
	next();
};