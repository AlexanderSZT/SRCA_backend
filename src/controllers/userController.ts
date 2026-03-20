import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schemas/User";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

const signup = async (req: Request, res: Response) => {
	const { username, password, role, email, apiKey } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "An user with this email already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const _user = new User({
			username,
			password: hashedPassword,
			role: role ?? "user",
			email,
			apiKey,
		});

		const savedUser = await _user.save();
		return res.status(200).json({ message: "User created successfully", user: savedUser });
	} catch (error) {
		return res.status(400).json({ message: "Error while creating user", error });
	}
};

const signin = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	
	try {
		const user = await User.findOne({ username });
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (isPasswordValid) {
				const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "3d" });
				return res.status(200).json({ message: "Login successful", token, user });
			} else {
				return res.status(401).json({ message: "Invalid credentials" });
			}
		} else {
			return res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error", error });
	}
};

const getApiKey = async (token: string): Promise<string | null> => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		if (typeof decoded === "object" && decoded.username) {
			const user = await User.findOne({ username: decoded.username });
			if (user) {
				return user.apiKey;
			}
		}
		return null;
	} catch (error) {
		console.error("Error verifying token or fetching API key:", error);
		return null;
	}
};

const userController = {
	signup,
	signin,
	getApiKey,
};

export default userController;
