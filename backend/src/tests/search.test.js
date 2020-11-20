const request = require("supertest");
const app = require("../app");
const { uuid } = require("../config/index");
const search = require("../api/routes/search");

describe("Test search path", () => {
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
});

describe("Test public search/public method", () => {
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
});
