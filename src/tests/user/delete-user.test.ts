import mongoose from "mongoose";
import { User, UserModel } from "../../schema/user.schema";
import { gCall } from "../../test-utils/gCall";
import { testDb } from "../../test-utils/testDb";

describe("Delete user", () => {
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

    const deleteUserMutation = `
        mutation DeleteUser($userId: String!) {
            deleteUser(userId: $userId)
        }`;

    it("should delete user and return true", async () => {
        const response = await gCall({
            source: deleteUserMutation,
            variableValues: {
                userId: newUser._id.toString(),
            },
        });
        expect(response).toMatchObject({
            data: {
                deleteUser: true,
            },
        });
    });

    it("should return user not found error", async () => {
        const response = await gCall({
            source: deleteUserMutation,
            variableValues: {
                userId: "636737bb2890b3aa318bc791",
            },
        });
        expect(response.errors).toBeDefined();
        expect(response.errors).toBeInstanceOf(Array);
        expect(response.data).toBe(null);
    });
});
