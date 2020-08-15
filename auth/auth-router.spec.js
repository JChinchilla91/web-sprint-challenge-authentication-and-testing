const request = require('supertest');
const server = require('../api/server.js');
const { expectCt } = require('helmet');

describe('auth-router.js', () => {
    describe('GET /', () => {
        let res = {};
        beforeAll(async() => {
            res = await request(server).get('/api/auth');
        });

        it('should return 200 ok', () => {
            expect(res.status).toBe(200);
        });
        it('should return {we: "in the auth"', () => {
            expect(res.body).toEqual({ we: 'in the auth' });
        });
    });
});