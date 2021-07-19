import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../index';
import 'babel-polyfill';
import { user, validToken } from './utils/setup';

const { expect } = chai;
chai.use(chaiHttp);

describe('authentication', () => {
  it('should return 401 when user not logged in', async () => {
    const res = await chai.request(app).patch('/api/v1/users/1')
      .send(user)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9trcs')
      expect(res).to.have.status(401);
  });

  it('should return 401 when key is not set', async () => {
    const res = await chai.request(app).patch('/api/v1/users/1').send(user);
    expect(res).to.have.status(401);
    expect(res.body.message).to.equal('Unauthorized Access');
  });
});
