/*
import request from "supertest";
import app from "../app.js";
import { uuid } from "../config/index.js";
*/
const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

describe("Test the /api/login path", () => {
  test("Test GET without authorization", async () => {
    const response = await request(app).get("/api/login");
    expect(response.statusCode).toBe(400);
  });

  test("Test GET with authorization", async () => {
    const response = await request(app)
      .get("/api/login")
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Already Authorized");
  });

  test("Test GET with empty params", async () => {
    const response = await request(app)
      .get("/api/login")
      .query({ firstName: "", lastName: "", password: "" });
    expect(response.statusCode).toBe(400);
  });

  test("Test GET with incorrect params", async () => {
    const response = await request(app)
      .get("/api/login")
      .query({ firstName: "test", lastName: "test", password: "password" });
    expect(response.statusCode).toBe(400);
  });

  test("Test GET with incorrect params (Numbers)", async () => {
    const response = await request(app)
      .get("/api/login")
      .query({ firstName: 1, lastName: 2, password: 3 });
    expect(response.statusCode).toBe(400);
  });

  test("Test GET with incorrect params (Objects)", async () => {
    const response = await request(app)
      .get("/api/login")
      .query({
        firstName: { firstName: "test" },
        lastName: { password: "test" },
        password: { password: "password" },
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test GET with correct user and password", async () => {
    const response = await request(app).get("/api/login").query({
      firstName: "Ryan",
      lastName: "Strongman",
      password: "2EvXhxnn",
    });
    expect(response.statusCode).toBe(201);
  });

  test("Test GET with correct user and incorrect password", async () => {
    const response = await request(app).get("/api/login").query({
      firstName: "Ryan",
      lastName: "Strongman",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });
});
