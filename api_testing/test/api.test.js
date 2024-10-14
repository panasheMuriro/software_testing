import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import app from "../app.js";
chai.use(chaiHttp);

const { expect } = chai;

describe("API Tests", () => {
  let userId;

  // Create user
  it("should create a new user", (done) => {
    request
      .execute(app)
      .post("/api/users")
      .send({ name: "John Doe", email: "john@example.com" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include({
          name: "John Doe",
          email: "john@example.com",
        });
        userId = res.body.id;
        done();
      });
  });

  // Read the users
  it("should get all users", (done) => {
    request
      .execute(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").that.is.not.empty;
        done();
      });
  });

  // Test PUT (Update User)
  it("should update a user", (done) => {
    request
      .execute(app)
      .put(`/api/users/${userId}`)
      .send({ name: "Jane Doe" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.include({ name: "Jane Doe" });
        done();
      });
  });

  // Delete User
  it("should delete a user", (done) => {
    request
      .execute(app)
      .delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  // Test Rate Limiting
  it("should return 429 Too Many Requests", (done) => {
    const requests = [];
    for (let i = 0; i < 12; i++) {
      requests.push(
        request
          .execute(app)
          .post("/api/users")
          .send({ name: `User ${i}`, email: `user${i}@example.com` })
      );
    }
    Promise.all(requests)
      .then((responses) => {
        // Check that the 11th request returns 429
        const lastResponse = responses[responses.length - 1];
        expect(lastResponse).to.have.status(429);
        done();
      })
      .catch((err) => done(err));
  });
});
