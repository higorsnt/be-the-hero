const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const ong = {
  name: "APAD",
  email: "contato@apad.com.br",
  whatsapp: "47900000000",
  city: "Rio do Sul",
  uf: "SC"
};

describe('Session', () => {

  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should authenticated with valid id', async () => {
    let { body } = await request(app)
      .post('/ongs')
      .send(ong);
    
    let response = await request(app)
      .post('/sessions')
      .send(body);
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('APAD');
  });

  it('should not authenticated with invalid id', async () => {
    let response = await request(app)
      .post('/sessions')
      .send({ id: '123456789' });
    
    expect(response.status).toBe(400);
  });

  it('should not authenticated when id param is not passed', async () => {
    let response = await request(app)
      .post('/sessions');
    
    expect(response.status).toBe(400);
  });
});