const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Piyush",
            email: "piyush@example.com",
            password: "Piyush00",
        })
        .expect(201);

    //Assert database changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assert about response body
    expect(response.body).toMatchObject({
        user: {
            name: "Piyush",
            email: "piyush@example.com",
        },
        token: user.tokens[0].token,
    });

    expect(user.password).not.toBe("Sparsh00");
});

test("Should login an existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: "mayank@example.com",
            password: "Mayank00",
        })
        .expect(200);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non-existing user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "mayank@example.co",
            password: "Mayank00",
        })
        .expect(400);
});

test("Shold get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Shold not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("Shold delete account for user", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Shold not delete account for unauthenticated user", async () => {
    await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Shold update profile for user", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({ name: "Sparsh" })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toBe("Sparsh");
});

test("Shold not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({ country: "India" })
        .expect(400);
});
