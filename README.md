# Varosa Task - Shiva

This is a simple CRUD task developed with typescript, nodejs, mongodb and graphql.

## Installation

---

1. Clone the project
2. Create mongodb database
3. npm install
4. Create .env file and copy variables from .env.example
5. npm run dev

## Testing

---

1. Create mongodb database for testing
2. Configure database uri in .env MONGO_TEST_URI, if it doesn't work, then configure in /src/test-utils/testDb.ts
3. npm run test

## Description

---

This task consists of user CRUD operation. It is developed in typescript using Node.js, MongoDB and GraphQL.

-   It consists of User schema consisting of following attributes:
    -   name: String
    -   phone: String|Min:9|Max:12
    -   email: String|Unique
    -   address?: String
    -   nationality?: String
    -   dob: Date
    -   education?: String
    -   contact_mode: Enum['phone', 'email', 'none']
-   CRUD endpoints:
    -   query users: List users array with pagination details
    -   query user: Get single user
    -   mutation createUser: Create new user
    -   mutation updateUser: Update user details
    -   mutation deleteUser: Delete user

## Endpoint testing

---

The endpoints can be tested in browser or postman through the graphql endpoint. The default url is "http://localhost:5000/graphql".

1.  List users: query

    ```json
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
    }
    ```

    -   Input Variables:

    ```json
    {
        "page": 1,
        "limit": 10
    }
    ```

    -   Returns:

    ```json
    {
        "data": {
            "users": {
                "data": [],
                "paging": {
                    "totalItems": 0,
                    "page": 1,
                    "pages": 1
                }
            }
        }
    }
    ```

2.  Create User: mutation

    ```json
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
        }
    ```

    -   Input Variables

    ```json
    {
        "input": {
            "name": "Shiva",
            "phone": "9815221020",
            "email": "shiva@gmail.com",
            "address": "Lalitpur",
            "nationality": "Nepali",
            "dob": "1998-02-27",
            "education": "Bachelor",
            "contact_mode": "phone"
        }
    }
    ```

    -   Returns

    ```json
    {
        "data": {
            "createUser": {
                "_id": "6367f8de702e7e91d0d998cd",
                "name": "Shiva",
                "phone": "9815221020",
                "email": "shiva@gmail.com",
                "address": "Lalitpur",
                "nationality": "Nepali",
                "dob": "1998-02-27T00:00:00.000Z",
                "education": "Bachelor",
                "contact_mode": "phone"
            }
        }
    }
    ```

3.  Get single user: query

    ```json
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
    }
    ```

    -   Input variables

    ```json
    {
        "userId": ObjectId
    }
    ```

    -   Returns

    ```json
    {
        "data": {
            "user": {
                "_id": "6367f8de702e7e91d0d998cd",
                "name": "Shiva",
                "phone": "9815221020",
                "email": "shiva@gmail.com",
                "address": "Lalitpur",
                "nationality": "Nepali",
                "dob": "1998-02-27T00:00:00.000Z",
                "education": "Bachelor",
                "contact_mode": "phone"
            }
        }
    }
    ```

4.  Update user: mutation

    ```json
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
    }
    ```

    -   Input variables

    ```json
    {
        "userId": ObjectId,
        "update": {
            "name": "Shiva Shrestha",
            "phone": "9815221020",
            "email": "shiva@gmail.com",
            "address": "Kathmandu",
            "nationality": "Nepali",
            "dob": "1998-02-27",
            "education": "Bachelor",
            "contact_mode": "phone"
        }
    }
    ```

    -   Returns

    ```json
    {
        "data": {
            "updateUser": {
                "name": "Shiva Shrestha",
                "email": "shiva@gmail.com",
                "phone": "9815221020",
                "address": "Kathmandu",
                "nationality": "Nepali",
                "dob": "1998-02-27T00:00:00.000Z",
                "education": "Bachelor",
                "contact_mode": "phone"
            }
        }
    }
    ```

5.  Delete User: mutation

    ```json
    mutation DeleteUser($userId: String!) {
        deleteUser(userId: $userId)
    }
    ```

    -   Input variables

    ```json
    {
        "userId": ObjectId
    }
    ```

    -   Returns

    ```json
    {
        "data": {
            "deleteUser": true // return true if success, else returns false
        }
    }
    ```

## Used Packages

---

1.  Dependencies
    Since I have used typescript in this project, so I used typescript version of every dependencies.

        - express: web framework for Node.js
        - mongoose: data modeling tool for MongoDB
        - typegoose: define mongoose models using TypeScript classes
        - graphql: query language for APIs
        - type-graphql: create GraphQL schema and resolvers with TypeScript
        - apollo-server-express: express imtegration of Apollo Server
        - class-validator: Decorator based data validation
        - dotenv: store environment variables

2.  Dev Dependencies

    - eslint: code pattern checker for JavaScript
    - prettier: code formatter
    - jest: delightful testing framework
    - ts-jest: typescript supported jest
