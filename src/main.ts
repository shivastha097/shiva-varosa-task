import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { dbConnect } from "./utils/db";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.NODE_ENV === "dev" ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL;

const bootstrap = async () => {
    const app: Application = express();

    // Initialize and setup graphql server
    const schema = await buildSchema({
        resolvers,
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Establish database connection
    await dbConnect();

    app.listen(PORT, () => {
        console.log(`Server running on ${BASE_URL}:${PORT}`);
    });
};
bootstrap();
