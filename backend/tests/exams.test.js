const request = require('supertest');
const app = require('../src/app');

describe('Exam Endpoints', () => {
  let authToken;

  beforeAll(async () => {
    // Login to get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = loginRes.body.token;
  });

  describe('POST /api/exams', () => {
    it('should create a new exam', async () => {
      const examData = {
        title: 'Math Test',
        description: 'Basic math test',
        date: '2024-12-31',
        time: '10:00',
        duration: 60
      };

      const res = await request(app)
        .post('/api/exams')
        .set('Authorization', `Bearer ${authToken}`)
        .send(examData);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(examData.title);
    });

    it('should return error without auth token', async () => {
      const examData = {
        title: 'Math Test',
        date: '2024-12-31',
        time: '10:00',
        duration: 60
      };

      const res = await request(app)
        .post('/api/exams')
        .send(examData);

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/exams', () => {
    it('should get all exams', async () => {
      const res = await request(app)
        .get('/api/exams')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});