import mongoose from "mongoose";
import { UserModel } from "../../schema/user.schema";
import { gCall } from "../../test-utils/gCall";
import { testDb } from "../../test-utils/testDb";

describe("List users", () => {
    beforeAll(async () => {
        await testDb();
        await UserModel.deleteMany({});
        await UserModel.create({
            name: "Shiva",
            phone: "981522102000",
            email: "shiva@gmail.com",
            address: "Lalitpur",
            nationality: "Nepali",
            dob: "2025-10-12",
            education: "Bachelor",
            contact_mode: "phone",
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const listUsersQuery = `
        query Data($page: Float, $limit: Float) {
            users(page: $page, limit: $limit) {
                data {
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
                paging {
                    totalItems
                    page
                    pages
                }
            }
        }`;

    it("should list paginated users", async () => {
        const response = await gCall({
            source: listUsersQuery,
            variableValues: {
                page: 1,
                limit: 15,
            },
        });
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty("users");
        expect(response.data?.users?.data).toBeInstanceOf(Array);
        expect(response.data?.users?.data).toHaveLength(1);
    });
});
