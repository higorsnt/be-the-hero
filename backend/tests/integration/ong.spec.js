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

describe('ONG', () => {

  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send(ong);
    
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });

  it('should not create a new ONG when name is not present', async () => {
    const { name, ...newOng } = ong;
    const response = await request(app)
      .post('/ongs')
      .send(newOng);
    
      expect(response.status).toBe(400);
  });

  it('should not create a new ONG when email is not present', async () => {
    const { email, ...newOng } = ong;
    const response = await request(app)
      .post('/ongs')
      .send(newOng);
    
      expect(response.status).toBe(400);
  });

  it('should not create a new ONG when whatsapp is not present', async () => {
    const { whatsapp, ...newOng } = ong;
    const response = await request(app)
      .post('/ongs')
      .send(newOng);
    
      expect(response.status).toBe(400);
  });

  it('should not create a new ONG when city is not present', async () => {
    const { city, ...newOng } = ong;
    const response = await request(app)
      .post('/ongs')
      .send(newOng);
    
      expect(response.status).toBe(400);
  });

  it('should not create a new ONG when uf is not present', async () => {
    const { uf, ...newOng } = ong;
    const response = await request(app)
      .post('/ongs')
      .send(newOng);
    
      expect(response.status).toBe(400);
  });

  it('should be able to list all ONGs registered', async () => {
    let secondOng = {
      name: "Aldeias Infantis SOS",
      email: "contato@aldeias.org",
      whatsapp: "84111111111",
      city: "Caicó",
      uf: "RN"
    };

    let { body: firstOng } = await request(app).post('/ongs').send(ong);
    let { body: secondOngId } = await request(app).post('/ongs').send(secondOng);

    const response = await request(app)
      .get('/ongs');
    
    expect(response.body.length).toBe(2);
    expect(response.body).toStrictEqual([{ ...ong, ...firstOng }, { ...secondOng, ...secondOngId }]);
  });
});