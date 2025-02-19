import mongoose from "mongoose";

const mongodbConnect = (URL: string) => {
	return mongoose.connect(URL);
};

export { mongodbConnect };
