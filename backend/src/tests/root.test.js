const request = require("supertest");
const app = require("../app");
const { uuid } = require("../config/index");

describe("Test the root path", () => {
  test("Test GET on root", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  test("Test GET on root", async () => {
    const response = await request(app).get("/api/connection");
    expect(response.text).toBe("Connection has been established successfully.");
  });
});
