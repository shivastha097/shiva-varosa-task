import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

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
