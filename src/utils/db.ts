import mongoose from "mongoose";

/**
 * Database Connection
 */
export async function dbConnect() {
    const MONGO_URI: string = process.env.MONGO_URI as string;

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb successfully connected");
    } catch (error) {
        console.error("Error: ", error);
        process.exit(1);
    }
}
