/*
import request from "supertest";
import app from "../app.js";
import { uuid } from "../config/index.js";
*/
const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

describe("Test the root path", () => {
  test("Test GET on root", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  test("Test database connection", async () => {
    const response = await request(app).get("/api/connection");
    expect(response.text).toBe(
      '{"message":"Connection has been established successfully."}'
    );
  });
});
