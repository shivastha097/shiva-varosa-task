import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.NODE_ENV === "dev" ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL;

const bootstrap = async () => {
    const app = express();

    app.get("/status", (req, res) => {
        return res.json({ status: "OK" });
    });

    app.listen(PORT, () => {
        console.log(`Server running on ${BASE_URL}:${PORT}`);
    });
};
bootstrap();
