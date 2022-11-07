import { ApolloError } from "apollo-server-express";
import { CreateUserInput, UpdateUserInput, UserFilter, UserListResponse } from "../types/user.types";
import { User, UserModel } from "../schema/user.schema";
import errorHandler from "../utils/error";

/**
 * User service
 */
export default class UserService {
    /**
     *
     * @param userFilter
     * @returns users
     */
    async find(userFilter: UserFilter): Promise<UserListResponse> {
        const page = userFilter.page || 1;
        const limit = userFilter.limit || 10;

        const count = await UserModel.countDocuments();
        const users = await UserModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return {
            data: users,
            paging: {
                totalItems: count,
                page,
                pages: Math.ceil(count / limit),
            },
        };
    }

    /**
     *
     * @param id
     * @returns user
     */
    async findById(id: string): Promise<User> {
        const user = await UserModel.findById(id);
        if (!user) throw new ApolloError("User not found", "ENTITY_NOT_FOUND");
        return user;
    }

    /**
     *
     * @param createUserInput
     * @returns new user
     */
    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const existingUser = await UserModel.findOne({ email: createUserInput.email });
        if (existingUser)
            throw new ApolloError(
                "Duplicate email entry. User with given email already exists.",
                "DUPLICATE_EMAIL_ERROR",
            );
        return await UserModel.create(createUserInput);
    }

    /**
     *
     * @param id
     * @param updateUserInput
     * @returns updated user
     */
    async updateUser(id: string, updateUserInput: UpdateUserInput): Promise<User | null> {
        const user = await UserModel.findById(id);
        if (!user) throw new ApolloError("User not found", "ENTITY_NOT_FOUND");
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateUserInput, {
            new: true,
            lean: true,
        });
        return updatedUser;
    }

    /**
     *
     * @param id
     * @returns boolean
     */
    async deleteUser(id: string): Promise<Boolean> {
        const user = await UserModel.findById(id);
        if (!user) throw new ApolloError("User not found", "ENTITY_NOT_FOUND");
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser?.isModified) return true;
        return false;
    }
}
