import { CreateUserInput, UpdateUserInput, UserFilter, UserModel } from "../schema/user.schema";

export default class UserService {
    async find(userFilter: UserFilter) {
        const { page, limit } = userFilter;
        const users = await UserModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        return users;
    }

    async findById(id: string) {
        return await UserModel.findById(id);
    }

    async createUser(createUserInput: CreateUserInput) {
        return await UserModel.create(createUserInput);
    }

    async updateUser(id: string, updateUserInput: UpdateUserInput) {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("User not found");
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateUserInput, {
            new: true,
            lean: true,
        });
        console.log(updatedUser);
        return updatedUser;
    }

    async deleteUser(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("User not found");
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser?.isModified) return true;
        return false;
    }
}
