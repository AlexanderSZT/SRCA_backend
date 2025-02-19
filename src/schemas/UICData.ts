import mongoose, { Schema, Document } from "mongoose";

interface IUICKindCode extends Document {
	code: number;
	label: string;
	type: "passenger" | "freight" | "motorised" | "other";
}

interface IUICCountryCode extends Document {
	code: number;
	iso: string;
	label: string;
}

const UICKindCodeSchema: Schema = new Schema({
	code: { type: Number, required: true, unique: true },
	label: { type: String, required: true },
	type: { type: String, required: true },
});

const UICCountryCodeSchema: Schema = new Schema({
	code: { type: Number, required: true, unique: true },
	iso: { type: String, required: true },
	label: { type: String, required: true },
});

const UICKindCode = mongoose.model<IUICKindCode>("UICKindCode", UICKindCodeSchema);
const UICCountryCode = mongoose.model<IUICCountryCode>("UICCountryCode", UICCountryCodeSchema);

export { UICKindCode, UICCountryCode };
