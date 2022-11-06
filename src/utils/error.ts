import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";

const errorHandler = (err: GraphQLError | any) => {
    if (err.message && err.message.startsWith("Argument Validation Error")) {
        return {
            message: "Validation Error",
            code: err.extensions.code,
            data: Object.values(err.extensions.exception.validationErrors).map((el: any) => {
                return {
                    property: el.property,
                    constraints: Object.values(el.constraints),
                };
            }),
        };
    }
    if (err.extensions.code === "BAD_USER_INPUT") {
        return {
            message: "Input Error",
            code: err.extensions.code,
            data: err.message.split(";"),
        };
    }
    if (
        err.extensions.code === "INTERNAL_SERVER_ERROR" ||
        err.extensions.code === "ENTITY_NOT_FOUND" ||
        err.extensions.code === "DUPLICATE_EMAIL_ERROR"
    ) {
        return {
            message: "Something went wrong",
            code: err.extensions.code,
            data: err.message,
        };
    }
    return err;
};

export default errorHandler;
