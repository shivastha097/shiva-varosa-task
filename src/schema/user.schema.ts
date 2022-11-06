import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

export enum ContactMode {
    Phone = "phone",
    Email = "email",
    None = "none",
}

/**
 * User schema defination
 */
@ObjectType()
export class User {
    @Field(() => ID)
    _id!: string;

    @Field(() => String)
    @prop({ required: true })
    name!: string;

    @Field(() => String)
    @prop({ required: true })
    phone!: string;

    @Field(() => String)
    @prop({ required: true })
    email!: string;

    @Field(() => String, { nullable: true })
    @prop({ nullable: true })
    address!: string;

    @Field(() => String, { nullable: true })
    @prop()
    nationality!: string;

    @Field(() => Date)
    @prop({ type: () => Date, required: true })
    dob!: Date;

    @Field(() => String, { nullable: true })
    @prop()
    education!: string;

    @Field(() => String, { nullable: true, defaultValue: ContactMode.None })
    @prop({ enum: Object.values(ContactMode), default: ContactMode.None })
    contact_mode!: ContactMode;
}

export const UserModel = getModelForClass<typeof User>(User);
