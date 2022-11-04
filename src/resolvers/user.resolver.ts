import { Resolver, Query, Arg, Args, Mutation } from "type-graphql";
import { CreateUserInput, UpdateUserInput, User, UserFilter } from "../schema/user.schema";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Query(() => [User])
    users(@Args() userFilter: UserFilter) {
        return this.userService.find(userFilter);
    }

    @Query(() => User)
    user(@Arg("userId") id: string) {
        return this.userService.findById(id);
    }

    @Mutation(() => User)
    createUser(@Arg("input") createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User)
    updateUser(@Arg("userId") id: string, @Arg("update") updateUserInput: UpdateUserInput) {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => Boolean)
    deleteUser(@Arg("userId") id: string) {
        return this.userService.deleteUser(id);
    }
}
