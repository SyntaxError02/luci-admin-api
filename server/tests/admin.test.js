import chai from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
import app from "../index";
import "babel-polyfill";
import { admin, user, userWithMissingField } from "./utils/setup";

const { expect } = chai;
chai.use(chaiHttp);

let token;

describe("POST Admin", () => {
  it("should return 200 and successfully log an admin in", async () => {
    const res = await chai.request(app).post("/api/v1/login").send({
      email: admin.email,
      password: admin.password,
    });
    token = res.body.token;
    expect(res).to.have.status(200);
    expect(res.body.data).to.be.an("object");
    expect(res.body.message).to.be.equal("login successful");
  });

  it("should return 400 and not log an admin in", async () => {
    const res = await chai.request(app).post("/api/v1/login").send({
      email: admin.email,
      password: "Pa$$word0",
    });
    expect(res).to.have.status(400);
    expect(res.body.message).to.be.equal("email or password is invalid");
  });

  it("should return 400 and not log an admin in", async () => {
    const res = await chai.request(app).post("/api/v1/login").send({
      email: faker.internet.email(),
      password: admin.password,
    });
    expect(res).to.have.status(400);
    expect(res.body.message).to.be.equal("email or password is invalid");
  });

  it('should return 422 for missing field', async () => {
    const res = await chai.request(app).patch('/api/v1/users/1')
    .set('Authorization', `Bearer ${token}`).send(userWithMissingField);
    expect(res).to.have.status(422);
    expect(res.body.message).to.be.equal('"name" is required');
  });

  it('should return 422 for invalid params', async () => {
    const res = await chai.request(app)
    .patch('/api/v1/users/-1')
    .send(user)
    .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(422);
  });

  it('should return 200 and get all users', async () => {
    const res = await chai.request(app).get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.rows).to.be.an("array");
  });

  it('should return 200 and successfully update a user', async () => {
    const res = await chai.request(app).patch('/api/v1/users/1')
    .set('Authorization', `Bearer ${token}`).send(user);
    expect(res).to.have.status(200);
  });

  it('should return 422 for invalid field', async () => {
    const res = await chai.request(app).post('/api/v1/login').send({
      password: 'Pas$word'
    });
    expect(res).to.have.status(422);
    expect(res.body.message).to.be.equal('"email" is required');
  });
  -
  it('should return 422 for missing email', async () => {
    const res = await chai.request(app).post('/api/v1/login').send({
      email: 'test@gmail.com',
    });
    expect(res).to.have.status(422);
    expect(res.body.message).to.be.equal('"password" is required');
  });
});
