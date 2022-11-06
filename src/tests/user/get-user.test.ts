import mongoose from "mongoose";
import { User, UserModel } from "../../schema/user.schema";
import { gCall } from "../../test-utils/gCall";
import { testDb } from "../../test-utils/testDb";

describe("Get single user by ID", () => {
    let newUser: User;

    beforeAll(async () => {
        await testDb();
        await UserModel.deleteMany({});
        newUser = await UserModel.create({
            name: "Shiva Shrestha",
            phone: "9816315341",
            email: "shiva@gmail.com",
            address: "Lalitpur",
            nationality: "Nepali",
            dob: "1998-02-27",
            education: "Bachelor",
            contact_mode: "phone",
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const getUserQuery = `
        query User($userId: String!) {
            user(userId: $userId) {
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

    it("should fetch single user", async () => {
        const response = await gCall({
            source: getUserQuery,
            variableValues: {
                userId: newUser._id.toString(),
            },
        });
        expect(response).toMatchObject({
            data: {
                user: {
                    name: newUser.name,
                    phone: newUser.phone,
                    email: newUser.email,
                    address: newUser.address,
                    nationality: newUser.nationality,
                    dob: "1998-02-27T00:00:00.000Z",
                    education: newUser.education,
                    contact_mode: newUser.contact_mode,
                },
            },
        });
    });

    it("should return user not found error", async () => {
        const response = await gCall({
            source: getUserQuery,
            variableValues: {
                userId: "636737bb2890b3aa318bc791",
            },
        });
        expect(response.errors).toBeDefined();
        expect(response.errors).toBeInstanceOf(Array);
        expect(response.data).toBe(null);
    });
});
