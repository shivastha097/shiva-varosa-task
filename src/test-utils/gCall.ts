import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { resolvers } from "../resolvers";

interface Options {
    source: string;
    variableValues?: any;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await buildSchema({ resolvers });
    }
    return graphql({
        schema,
        source,
        variableValues,
    });
};
