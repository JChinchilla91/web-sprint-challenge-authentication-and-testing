const request = require('supertest');
const server = require('../api/server.js');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImJydWgiLCJpYXQiOjE1OTc1MTM0NTEsImV4cCI6MTU5NzUyNDI1MX0.KOSJU1cCHtgQvkZNRK_SxgitDbfQtpPZ36a8ZFaGI7s';

describe('jokes-router.js', () => {
    describe('GET /api/jokes', () => {
        let res = {};
        beforeAll(async() => {
            res = await request(server).get('/api/jokes').auth(token, {type: 'bearer'});
        });

        it('should return status 401 Unauthorized', () => {
            expect(res.status).toBe(401);
        });

        it('should return an object', () => {
            expect(res.body).toBeInstanceOf(Object);
        })
    })
})