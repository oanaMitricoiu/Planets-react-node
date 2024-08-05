const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test("It should respond with a 200 code", async () => {
        const response = await request(app)
            .get("/launches")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("Test POST/launches", () => {
    const launchData = {
        mission: "USS Enterprize",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
        mission: "USS Enterprize",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
    };

    const launchDataInvalidDate = {
        mission: "USS Enterprize",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "zoot",
    };

    test("It should respond with 201 created", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchData)
            .expect("Content-type", /json/)
            .expect(201);

        const requestDate = new Date(launchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test("It should catch missing required property", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchDataWithoutDate)
            .expect("Content-type", /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        });
    });
    test("It should catch invalid dates", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchDataInvalidDate)
            .expect("Content-type", /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid launch date",
        });
    });
});
