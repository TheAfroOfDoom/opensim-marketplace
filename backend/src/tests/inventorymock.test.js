const request = require("supertest");
const app = require("../app.js");
const { uuid } = require("../config/index.js");

jest.mock("../models/Assets.js", () => {
  const mockdb = require("../config/mockdatabase.js");
  return mockdb.define(
    "assets",
    {
      name: "test",
      description: "",
      assetType: 0,
      local: 0,
      temporary: 0,
      data: "",
      id: "00000000-0000-1111-9999-000000000001",
      create_time: 1602029299,
      access_time: 1602029299,
      public: 0,
      CreatorID: "dfafbece-1e64-4f40-a435-edadd348c630",
    },
    {}
  );
});

jest.mock("../models/InventoryItems.js", () => {
  const mockdb = require("../config/mockdatabase.js");
  return mockdb.define("inventoryitems", {
    assetID: "00000000-0000-1111-9999-000000000001",
    assetType: 0,
    InventoryName: null,
    InvType: null,
    creatorID: "dfafbece-1e64-4f40-a435-edadd348c630",
    creationDate: 1602029299,
    InventoryID: "00000000-0000-0000-0000-000000000000",
  });
});

describe("Test /api/inventory/remove method", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Test without authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" });
    expect(response.statusCode).toBe(401);
  });
  it("Test with authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(204);
  });

  it("Test with authorization but invalid UUID", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c631`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization and correct assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(204);
  });

  it("Test with authorization and incorrect assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: "00000000-0000-1111-9999-000000000000" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param name", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ id: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (Number)", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: 1000 })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
  it("Test with authorization and incorrect assetID param type (Object)", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: { assetID: "00000000-0000-1111-9999-000000000000" } })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (boolean)", async () => {
    const response = await request(app)
      .post("/api/inventory/remove")
      .send({ assetID: true })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
});

describe("Test /api/inventory/upload method", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Test without authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" });
    expect(response.statusCode).toBe(401);
  });
  it("Test with authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization but invalid UUID", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c631`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization and correct assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization and incorrect assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: "00000000-0000-1111-9999-000000000000" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param name", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ id: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (Number)", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: 1000 })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
  it("Test with authorization and incorrect assetID param type (Object)", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: { assetID: "00000000-0000-1111-9999-000000000000" } })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (boolean)", async () => {
    const response = await request(app)
      .post("/api/inventory/upload")
      .send({ assetID: true })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
});

describe("Test /api/inventory/private method", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Test without authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" });
    expect(response.statusCode).toBe(401);
  });
  it("Test with authorization", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization but invalid UUID", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c631`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization and correct assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.statusCode).toBe(200);
  });

  it("Test with authorization and incorrect assetID", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: "00000000-0000-1111-9999-000000000000" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param name", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ id: "00000000-0000-1111-9999-000000000001" })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (Number)", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: 1000 })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
  it("Test with authorization and incorrect assetID param type (Object)", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: { assetID: "00000000-0000-1111-9999-000000000000" } })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });

  it("Test with authorization and incorrect assetID param type (boolean)", async () => {
    const response = await request(app)
      .post("/api/inventory/private")
      .send({ assetID: true })
      .set("Cookie", [`uuid=dfafbece-1e64-4f40-a435-edadd348c630`]);
    expect(response.text).toBe("Invalid ID");
  });
});
