/*
import request from "supertest";
import app from "../app.js";
import { uuid } from "../config/index.js";
*/
const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

describe("Test /api/search path", () => {
  //Authorization
  test("Test GET without authorization", async () => {
    const response = await request(app).get("/api/search");
    expect(response.statusCode).toBe(401);
  });
  test("Test GET with authorization", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.statusCode).toBe(200);
  });

  //Search String params
  test("Test GET with authorization and search string (Empty String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Test" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String) 2", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Rocks" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String) 3", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Asset Test" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (Number)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: 3 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (Object)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: { searchString: "Asset Test" } });
    expect(response.text).toBe("Search String must be string");
  });

  //Limit param
  test("Test GET with authorization and limit (Number)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: 1 });
    expect(JSON.parse(response.text).length).toBe(1);
  });
  test("Test GET with authorization and limit ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: "1" });
    expect(JSON.parse(response.text).length).toBe(1);
  });
  test("Test GET with authorization and limit ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: "Not a number" });
    expect(response.statusCode).toBe(400);
  });

  //Order param
  test("Test GET with authorization and order (Number)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: 1 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and order ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: "1" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and order ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: "Not a number" });
    expect(response.statusCode).toBe(200);
  });

  //Offset param
  test("Test GET with authorization and offset (Number)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: 1 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and offset ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: "1" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and offset ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: "Not a number" });
    expect(response.statusCode).toBe(400);
  });
});

describe("Test public /api/search/public method", () => {
  //Authorization
  test("Test GET without authorization", async () => {
    const response = await request(app).get("/api/search/public");
    expect(response.statusCode).toBe(401);
  });
  test("Test GET with authorization", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.statusCode).toBe(200);
  });

  //Search String params
  test("Test GET with authorization and search string (Empty String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Test" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String) 2", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Rocks" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (String) 3", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: "Asset Test" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (Number)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: 3 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and search string (Object)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ searchString: { searchString: "Asset Test" } });
    expect(response.text).toBe("Search String must be string");
  });

  //Limit param
  test("Test GET with authorization and limit (Number)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: 1 });
    expect(JSON.parse(response.text).length).toBe(1);
  });
  test("Test GET with authorization and limit ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: "1" });
    expect(JSON.parse(response.text).length).toBe(1);
  });
  test("Test GET with authorization and limit ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ limit: "Not a number" });
    expect(response.statusCode).toBe(400);
  });

  //Order param
  test("Test GET with authorization and order (Number)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: 1 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and order ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: "1" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and order ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ order: "Not a number" });
    expect(response.statusCode).toBe(200);
  });

  //Offset param
  test("Test GET with authorization and offset (Number)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: 1 });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and offset ( Number String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: "1" });
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization and offset ( Word String)", async () => {
    const response = await request(app)
      .get("/api/search/public")
      .set("Cookie", [`uuid=${uuid}`])
      .query({ offset: "Not a number" });
    expect(response.statusCode).toBe(400);
  });
});
