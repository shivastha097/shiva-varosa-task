import mongoose from "mongoose";
import { UserModel } from "../../schema/user.schema";
import { gCall } from "../../test-utils/gCall";
import { testDb } from "../../test-utils/testDb";

describe("Create User", () => {
    beforeAll(async () => {
        await testDb();
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const createUserMutation = `
        mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
                _id
                name
                phone
                email
                address
                nationality
                dob
                education
                contact_mode
            }
        }`;

    const userInput = {
        name: "Shiva Shrestha",
        phone: "9816315341",
        email: "shiva@gmail.com",
        address: null,
        nationality: null,
        dob: "1998-02-27",
        education: null,
        contact_mode: "phone",
    };
    it("should create a new user", async () => {
        const response = await gCall({
            source: createUserMutation,
            variableValues: {
                input: userInput,
            },
        });
        expect(response).toMatchObject({
            data: {
                createUser: {
                    name: userInput.name,
                    phone: userInput.phone,
                    email: userInput.email,
                    dob: "1998-02-27T00:00:00.000Z",
                    address: userInput.address,
                    nationality: userInput.nationality,
                    education: userInput.education,
                    contact_mode: userInput.contact_mode,
                },
            },
        });
    });

    it("should return bad input error", async () => {
        const response = await gCall({
            source: createUserMutation,
            variableValues: {
                input: {
                    name: null,
                    phone: "9816315341",
                    email: "shiva@gmail.com",
                    address: null,
                    nationality: null,
                    dob: "1998-02-27",
                    education: null,
                    contact_mode: "phone",
                },
            },
        });
        expect(response.errors).toBeDefined();
        expect(response.errors).toBeInstanceOf(Array);
    });

    it("should return validation error", async () => {
        const response = await gCall({
            source: createUserMutation,
            variableValues: {
                input: {
                    name: "Shiva Shrestha",
                    phone: "98161631535341",
                    email: "shiva123",
                    address: null,
                    nationality: null,
                    dob: "1998-02-27",
                    education: null,
                    contact_mode: "phone",
                },
            },
        });
        expect(response.errors).toBeDefined();
        expect(response.errors).toBeInstanceOf(Array);
    });
});
