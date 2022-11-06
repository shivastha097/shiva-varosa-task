import mongoose from "mongoose";
import { User, UserModel } from "../../schema/user.schema";
import { gCall } from "../../test-utils/gCall";
import { testDb } from "../../test-utils/testDb";

describe("Update User", () => {
    let updateUserInput: User;

    beforeAll(async () => {
        await testDb();
        await UserModel.deleteMany({});
        updateUserInput = await UserModel.create({
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

    const updateUserMutation = `
        mutation UpdateUser($userId: String!, $update: UpdateUserInput!) {
            updateUser(userId: $userId, update: $update) {
            name
            email
            phone
            address
            nationality
            dob
            education
            contact_mode
            }
        }`;

    const userUpdate = {
        name: "Shiva K Shrestha",
        phone: "9816315341",
        email: "shiva@gmail.com",
        address: "Kathmandu",
        nationality: "Nepali",
        dob: "1998-02-27",
        education: "Bachelor",
        contact_mode: "phone",
    };
    it("should update user", async () => {
        const response = await gCall({
            source: updateUserMutation,
            variableValues: {
                userId: updateUserInput._id.toString(),
                update: userUpdate,
            },
        });
        expect(response).toMatchObject({
            data: {
                updateUser: {
                    name: userUpdate.name,
                    phone: userUpdate.phone,
                    email: userUpdate.email,
                    address: userUpdate.address,
                    nationality: userUpdate.nationality,
                    dob: "1998-02-27T00:00:00.000Z",
                    education: userUpdate.education,
                    contact_mode: userUpdate.contact_mode,
                },
            },
        });
    });

    it("should return user not found error", async () => {
        const response = await gCall({
            source: updateUserMutation,
            variableValues: {
                userId: "636737bb2890b3aa318bc791",
                update: userUpdate,
            },
        });
        expect(response.errors).toBeDefined();
        expect(response.data).toBe(null);
    });

    it("should return bad input error", async () => {
        const response = await gCall({
            source: updateUserMutation,
            variableValues: {
                input: {
                    name: null,
                    phone: "981522102",
                    email: "shiva12@gmail.com",
                    address: null,
                    nationality: null,
                    dob: "2025-10-12",
                    education: null,
                    contact_mode: "phone",
                },
            },
        });
        expect(response.errors).toBeDefined();
    });

    it("should return validation error", async () => {
        const response = await gCall({
            source: updateUserMutation,
            variableValues: {
                input: {
                    name: "Shiva",
                    phone: "981522102000",
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
    });
});
