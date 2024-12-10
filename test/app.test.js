import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("VitaGuide Testing", () => {
  it("should return welcome message on GET /", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Welcome to VitaGuide!");
        done();
      });
  });

  it("should return 400 when name is missing in POST /data", (done) => {
    chai
      .request(app)
      .post("/data")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Name is required!");
        done();
      });
  });

  it("should return greeting message on POST /data", (done) => {
    chai
      .request(app)
      .post("/data")
      .send({ name: "Hanish" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Hello, Hanish!");
        done();
      });
  });
});
