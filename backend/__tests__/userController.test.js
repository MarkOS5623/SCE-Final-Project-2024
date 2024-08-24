const request = require('supertest');
const app = require('../config/testServer');
const User = require('../models/user');
const Document = require('../models/document');
const Status = require('../models/status');
const mockingoose = require('mockingoose');
utils = require('../utils.js');

describe('User Controller Tests', () => {
    describe('POST /api/users/signup', () => {
        it('should return 201 and create a new user if email is not registered', async () => {
                mockingoose(User).toReturn(null, 'findOne');
                mockingoose(User).toReturn({ email: 'test@example.com', fname: 'Test', lname: 'User' }, 'create');
                const res = await request(app).post('/api/users/signup').send({
                    email: 'test@example.com',
                    password: 'password123',
                    fname: 'Test',
                    lname: 'User',
                    id: '123',
                    role: 'user',
                });
                expect(res.statusCode).toBe(201);
                expect(res.body.message).toBe('User created successfully');
        });

        it('should return 401 if email is already registered', async () => {
            mockingoose(User).toReturn({ email: 'test@example.com' }, 'findOne');
            const res = await request(app).post('/api/users/signup').send({
                email: 'test@example.com',
                password: 'password123',
                fname: 'Test',
                lname: 'User',
                id: '123',
                role: 'user',
            });
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe('This email is already registered to a user');
        });
    });
    describe('POST /api/users/login', () => {
        it('should return 200 and a token if email and password are valid', async () => {
            mockingoose(User).toReturn({ email: 'test@example.com', password: 'hashedpassword' }, 'findOne');
            jest.spyOn(utils, 'decrpytValue').mockResolvedValue(true);
            jest.spyOn(utils, 'encode').mockReturnValue('token');
            const res = await request(app).post('/api/users/login').send({
                email: 'test@example.com',
                password: 'password123',
            });
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Login successful');
            expect(res.body.token).toBe('token');
        });
    
        it('should return 401 if email or password is invalid', async () => {
            mockingoose(User).toReturn(null, 'findOne');
            const res = await request(app).post('/api/users/login').send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe('Invalid email or password');
        });
    });
    describe('POST /api/users/fetchrequests', () => {
        it('should return 200 with user requests and statuses', async () => {
            mockingoose(User).toReturn({
                email: 'test@example.com',
                fname: 'Test',
                lname: 'User',
                _id: 'user1',
                documents: ['doc1', 'doc2']
            }, 'findOne');
        
            mockingoose(Document).toReturn([
                { _id: 'doc1', authorizers: ['status1'] },
                { _id: 'doc2', authorizers: ['status2'] }
            ], 'find');
        
            mockingoose(Status).toReturn([
                { _id: 'status1', status: 'pending approval' },
                { _id: 'status2', status: 'pending approval' }
            ], 'find');
        
            const res = await request(app).post('/api/users/fetchrequests').send({
                userId: 'user1',
            });
        
            expect(res.statusCode).toBe(200);
            expect(res.body.docs).toHaveLength(2);
            expect(res.body.statuses).toEqual(['pending approval', 'pending approval']);
        });

        it('should return 400 if user is not found', async () => {
            mockingoose(User).toReturn(null, 'findOne');
            const res = await request(app).post('/api/users/fetchrequests').send({
                userId: 'invalidUserId',
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User not found');
        });
    });

    describe('GET /api/users/fetchauthlist', () => {
        it('should return 200 with list of admin names and ids', async () => {
            mockingoose(User).toReturn([
                { _id: 'admin1', fname: 'Admin', lname: 'One', role: 'admin' },
                { _id: 'admin2', fname: 'Admin', lname: 'Two', role: 'admin' }
            ], 'find');
            const res = await request(app).get('/api/users/fetchauthlist');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
        });
    });
});