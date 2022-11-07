import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { ContactMode, User } from "../schema/user.schema";

/**
 * type UserPaginateResponseObject
 */
@ObjectType()
class UserPaginateResponseObject {
    @Field(() => Number, { defaultValue: 0 })
    totalItems!: number;

    @Field(() => Number, { defaultValue: 1 })
    page!: number;

    @Field(() => Number, { defaultValue: 1 })
    pages!: number;
}

/**
 * type UserListResponse
 */
@ObjectType()
export class UserListResponse {
    @Field(() => [User])
    data!: User[];

    @Field(() => UserPaginateResponseObject)
    paging!: UserPaginateResponseObject;
}

/**
 * type UserFilter
 * Get paginated users
 */
@ArgsType()
export class UserFilter {
    @Field(() => Number, { nullable: true, defaultValue: 1 })
    page!: number;

    @Field(() => Number, { nullable: true, defaultValue: 10 })
    limit!: number;
}

/**
 * input CreateUserInput
 * Create user input types
 */
@InputType()
export class CreateUserInput implements Partial<User> {
    @IsString()
    @MinLength(3, { message: "Name must be at least 3 characters" })
    @MaxLength(50, { message: "Name must not be more than 50 characters" })
    @Field()
    name!: string;

    @IsString()
    @MinLength(9, { message: "Phone must be at least 9 digits" })
    @MaxLength(12, { message: "Phone must not be more than 12 digits" })
    @Field()
    phone!: string;

    @IsEmail()
    @Field()
    email!: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    address!: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    nationality!: string;

    @IsDate()
    @Field(() => Date)
    dob!: Date;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    education!: string;

    @IsOptional()
    @IsEnum(ContactMode)
    @Field(() => String, { nullable: true })
    contact_mode!: ContactMode;
}

/**
 * input UpdateUserInput
 * Update user input types
 */
@InputType()
export class UpdateUserInput implements Partial<User> {
    @IsString()
    @MinLength(3, { message: "Name must be at least 3 characters" })
    @MaxLength(50, { message: "Name must not be more than 50 characters" })
    @Field({ nullable: true })
    name!: string;

    @IsString()
    @MinLength(9, { message: "Phone must be at least 9 digits" })
    @MaxLength(12, { message: "Phone must not be more than 12 digits" })
    @Field({ nullable: true })
    phone!: string;

    @IsEmail()
    @Field({ nullable: true })
    email!: string;

    @IsString()
    @Field({ nullable: true })
    address!: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    nationality!: string;

    @IsDate()
    @Field(() => Date, { nullable: true })
    dob!: Date;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    education!: string;

    @IsOptional()
    @IsEnum(ContactMode)
    @Field(() => String, { nullable: true })
    contact_mode!: ContactMode;
}
