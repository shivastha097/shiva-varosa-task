import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsDate, IsEmail, IsEnum, IsString } from "class-validator";
import { ArgsType, Field, InputType, ObjectType } from "type-graphql";

enum ContactMode {
    Phone = "phone",
    Email = "email",
    None = "none",
}

@ObjectType()
export class User {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @prop({ required: true })
    name!: string;

    @Field(() => String)
    @prop({ required: true })
    phone!: string;

    @Field(() => String)
    @prop({ unique: true, required: true })
    email!: string;

    @Field(() => String)
    @prop()
    address!: string;

    @Field(() => String)
    @prop()
    nationality!: string;

    @Field(() => String)
    @prop()
    dob!: Date;

    @Field(() => String)
    @prop()
    education!: string;

    @Field(() => String)
    @prop({ enum: Object.values(ContactMode), default: ContactMode.None })
    contact_mode!: ContactMode;
}

export const UserModel = getModelForClass<typeof User>(User);

@ArgsType()
export class UserFilter {
    @Field(() => Number, { nullable: true, defaultValue: 1 })
    page!: number;

    @Field(() => Number, { nullable: true, defaultValue: 10 })
    limit!: number;
}

@InputType()
export class CreateUserInput implements Partial<User> {
    @IsString()
    @Field()
    name?: string;

    @IsString()
    @Field()
    phone?: string;

    @IsEmail()
    @Field()
    email!: string;

    @Field()
    address!: string;

    @Field()
    nationality!: string;

    @IsDate()
    @Field()
    dob!: Date;

    @Field()
    education!: string;

    @IsEnum(ContactMode)
    @Field()
    contact_mode!: ContactMode;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
    @IsString()
    @Field({ nullable: true })
    name?: string;

    @IsString()
    @Field({ nullable: true })
    phone?: string;

    @IsEmail()
    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    nationality?: string;

    @IsDate()
    @Field({ nullable: true })
    dob?: Date;

    @Field({ nullable: true })
    education?: string;

    @IsEnum(ContactMode)
    @Field({ nullable: true })
    contact_mode?: ContactMode;
}
