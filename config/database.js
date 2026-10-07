import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);

        console.log("Connected To MONGODB");
    } catch (error) {
        console.log("Error Connecting To MONGODB", error.message);
        process.exit(1);
    }
};

export default connectDB;