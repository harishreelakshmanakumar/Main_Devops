const request = require('supertest');
const app = require('../app');  // Assuming your Express app is exported from app.js

describe('Recipe API Tests', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});