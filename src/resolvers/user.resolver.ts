import { Resolver, Query, Arg, Args, Mutation } from "type-graphql";
import { CreateUserInput, UpdateUserInput, UserFilter, UserListResponse } from "../schema/types/user.types";
import { User } from "../schema/user.schema";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Query(() => UserListResponse)
    users(@Args() userFilter: UserFilter): Promise<UserListResponse> {
        return this.userService.find(userFilter);
    }

    @Query(() => User)
    user(@Arg("userId") id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Mutation(() => User)
    createUser(@Arg("input") createUserInput: CreateUserInput): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User)
    updateUser(@Arg("userId") id: string, @Arg("update") updateUserInput: UpdateUserInput): Promise<User | null> {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => Boolean)
    deleteUser(@Arg("userId") id: string): Promise<Boolean> {
        return this.userService.deleteUser(id);
    }
}
