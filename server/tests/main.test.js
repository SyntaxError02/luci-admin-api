import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import 'babel-polyfill';

const { expect } = chai;
chai.use(chaiHttp);

// homepage
describe('GET /', () => {
  it('should return 200 and a welcome message', async () => {
    const res = await chai.request(app).get('/api/v1/');
    expect(res).to.have.status(200);
  });
});

// 404 page not found
describe('GET /xoxo', () => {
  it('should return 404 and an error message', async () => {
    const res = await chai.request(app).get('/api/v1/xyz');
    expect(res).to.have.status(404);
    expect(res.body.message).to.be.equal('404 Page not found');
  });
});
