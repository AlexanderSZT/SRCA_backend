import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	role: "user" | "admin";
	apiKey: string;
}

const userSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true, min: 3, max: 30 },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["user", "admin"], default: "user" },
	apiKey: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
