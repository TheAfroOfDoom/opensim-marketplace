const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

/*
describe("Test the /api/inventory path", () => {
  test("Test GET without authorization", async () => {
    const response = await request(app).get("/api/inventory");
    expect(response.statusCode).toBe(401);
  });
  test("Test GET with authorization", async () => {
    const response = await request(app)
      .get("/api/inventory")
      .set("Cookie", [`uuid=${uuid}`]);
    expect(response.statusCode).toBe(200);
  });
  test("Test GET with authorization (Improper id)", async () => {
    const response = await request(app)
      .get("/api/inventory")
      .set("Cookie", [`uuid=0`]);
    expect(response.statusCode).toBe(401);
  });
  test("Test GET with authorization (Illegal UUID)", async () => {
    const response = await request(app)
      .get("/api/inventory")
      .set("Cookie", [`uuid=00000000-0000-0000-0000-000000000001`]);
    expect(response.statusCode).toBe(401);
  });
});
*/
