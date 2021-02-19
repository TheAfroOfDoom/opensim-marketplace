const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

describe("Test Wifi API login", () => {
  test("Test POST with correct username and password", async () => {
    const response = await request(app)
      .post("/api/wifi/login")
      .send({ firstname: "Wifi", lastname: "Admin", password: "kenny123" });
    expect(response.statusCode).toEqual(200);
  });
  test("Test POST with correct username and incorrect password", async () => {
    const response = await request(app)
      .post("/api/wifi/login")
      .send({ firstname: "Wifi", lastname: "Admin", password: "notkenny123" });
    expect(response.text).toEqual("Incorrect params");
  });
  test("Test POST with incorrect params (Objects)", async () => {
    const response = await request(app)
      .post("/api/wifi/login")
      .send({
        firstname: { firstname: "Wifi" },
        lastname: { lastname: "Admin" },
        password: { password: "notkenny123" },
      });
    expect(response.text).toEqual("Incorrect params");
  });
  test("Test POST with incorrect params (Numbers)", async () => {
    const response = await request(app)
      .post("/api/wifi/login")
      .send({ firstname: 1, lastname: 2, password: 3 });
    expect(response.text).toEqual("Incorrect params");
  });
});

describe("Test Wifi API Map", () => {
  test("Test GET with correct params (numbers)", async () => {
    const response = await request(app)
      .get("/api/wifi/map")
      .query({ x: 1000, y: 1000, zoom: 1 })
      .set("Cookie", [`uuid=f577aa90-7db9-4a77-afc2-6daee8916c3e`]);
    expect(response.statusCode).toEqual(200);
  });
  test("Test GET with correct params (strings)", async () => {
    const response = await request(app)
      .get("/api/wifi/map")
      .query({ x: "1000", y: "1000", zoom: "1" })
      .set("Cookie", [`uuid=f577aa90-7db9-4a77-afc2-6daee8916c3e`]);
    expect(response.statusCode).toEqual(200);
  });
  test("Test GET with correct params (numbers)", async () => {
    const response = await request(app)
      .get("/api/wifi/map")
      .query({ x: 1000, y: 1000, zoom: 1 })
      .set("Cookie", [`uuid=f577aa90-7db9-4a77-afc2-6daee8916c3e`]);
    expect(response.statusCode).toEqual(200);
  });
  test("Test GET with missing param", async () => {
    const response = await request(app)
      .get("/api/wifi/map")
      .query({ x: "1000", y: "1000" })
      .set("Cookie", [`uuid=f577aa90-7db9-4a77-afc2-6daee8916c3e`]);
    expect(response.statusCode).toEqual(400);
  });
  test("Test GET with different missing param", async () => {
    const response = await request(app)
      .get("/api/wifi/map")
      .query({ x: "1000", zoom: "1000" })
      .set("Cookie", [`uuid=f577aa90-7db9-4a77-afc2-6daee8916c3e`]);
    expect(response.statusCode).toEqual(400);
  });
});
