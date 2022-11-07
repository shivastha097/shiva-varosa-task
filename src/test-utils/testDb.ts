import mongoose from "mongoose";

/**
 *
 * @returns test database connection
 */
export const testDb = async () => {
    const MONGO_TEST_URI: string = (process.env.MONGO_TEST_URI as string) || "mongodb://127.0.0.1:27017/varosa_test_db";
    return await mongoose.connect(MONGO_TEST_URI);
};
