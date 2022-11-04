import { Resolver, Query } from "type-graphql";
import { User } from "../schema/user.schema";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Query(() => [User])
    users() {
        return this.userService.find();
    }
}
