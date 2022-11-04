import { UserModel } from "../schema/user.schema";

export default class UserService {
    async find() {
        return await UserModel.find().lean();
    }
}
