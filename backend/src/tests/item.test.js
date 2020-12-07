/*
import request from "supertest";
import app from "../app.js";
import { uuid } from "../config/index.js";
*/
const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

describe("Test the /api/item path", () => {
  test("Test GET without authorization", async () => {
    const response = await request(app).get("/api/item");
    expect(response.statusCode).toBe(401);
  });

  test("Test GET with authorization", async () => {
    const response = await request(app)
      .get("/api/item")
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Invalid ID");
  });

  test("Test GET with authorization and invalid itemid (String)", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ id: "0" })
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Invalid ID");
  });

  test("Test GET with authorization and invalid itemid (Number)", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ id: 1 })
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Invalid ID");
  });

  test("Test GET with authorization and invalid itemid (Object)", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ id: { id: "00000000-0000-0000-0000-000000000000" } })
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Invalid ID");
  });

  test("Test GET with authorization and valid itemid", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ id: "00000000-0000-2222-3333-000000000099" })
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.statusCode).toBe(200);
  });

  test("Test GET with authorization and valid itemid but wrong param name", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ assetID: "00000000-0000-0000-0000-000000000000" })
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.text).toBe("Invalid ID");
  });

  test("Test GET without authorization and invalid itemid", async () => {
    const response = await request(app).get("/api/item").query({ id: "0" });
    expect(response.statusCode).toBe(401);
  });

  test("Test GET without authorization and valid itemid", async () => {
    const response = await request(app)
      .get("/api/item")
      .query({ id: "00000000-0000-0000-0000-000000000000" });
    expect(response.statusCode).toBe(401);
  });
});
