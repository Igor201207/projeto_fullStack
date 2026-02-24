const request = require("supertest");
const app = require("../../index"); // sobe 1 nível até a raiz e pega index.js

describe("API Tests", () => {
  it("Create a material", async () => {
    const res = await request(app)
      .post("/materials")
      .send({ code: "M001", name: "Wood", stock: 500 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("Create a product", async () => {
    const res = await request(app)
      .post("/products")
      .send({ code: "P001", name: "Table", price: 300 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});