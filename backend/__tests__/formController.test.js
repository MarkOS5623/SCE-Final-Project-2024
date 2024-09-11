const request = require('supertest');
const mockingoose = require('mockingoose');
const app = require('../config/testServer');

const Form = require('../models/form');
const User = require('../models/user');

describe('formController', () => {
    afterEach(() => {
        mockingoose.resetAll(); // Reset mocks after each test
    });

    describe('POST /api/forms/saveform', () => {
    
        it('should update an existing form when found', async () => {
            mockingoose(User).toReturn([{ _id: 'user1', id: 'author1' }], 'find');
            mockingoose(Form).toReturn({ _id: 'form1', title: 'Test Form', text: 'Old data' }, 'findOne'); 
    
            const res = await request(app).post('/api/forms/saveform').send({
                title: 'Test Form',
                Data: 'Updated form data',
                Signatories: ['user1'],
                Author: 'author1',
                Type: 'General',
            });
    
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Form updated successfully');
        });
    
        it('should return a server error if an exception occurs', async () => {
            // Simulate an error during the User.find call
            mockingoose(User).toReturn(new Error('Database error'), 'find');
    
            const res = await request(app).post('/api/forms/saveform').send({
                title: 'Test Form',
                Data: 'Form data',
                Signatories: ['user1'],
                Author: 'author1',
                Type: 'General',
            });
    
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('Error saving form');
        });
    });

    describe('POST /api/forms/fetchform', () => {
        it('should fetch a form by title', async () => {
            mockingoose(Form).toReturn({ _id: 'form1', title: 'Test Form', text: 'Form data' }, 'findOne');

            const res = await request(app).post('/api/forms/fetchform').send({ title: 'Test Form' });

            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe('Test Form');
            expect(res.body.text).toBe('Form data');
        });

        it('should return 400 if form not found', async () => {
            mockingoose(Form).toReturn(null, 'findOne');

            const res = await request(app).post('/api/forms/fetchform').send({ title: 'Nonexistent Form' });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Form not found');
        });
    });

    describe('POST /api/forms/fetchnosignatureformslist', () => {
        it('should fetch forms with no signatures', async () => {
            mockingoose(Form).toReturn([{ title: 'Form 1' }, { title: 'Form 2' }], 'find');

            const res = await request(app).get('/api/forms/fetchnosignatureformslist');

            expect(res.statusCode).toBe(201);
            expect(res.body.docs).toHaveLength(2);
            expect(res.body.docs).toEqual(['Form 1', 'Form 2']);
        });

        it('should return 400 if no forms found', async () => {
            mockingoose(Form).toReturn([], 'find');

            const res = await request(app).get('/api/forms/fetchnosignatureformslist');

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Forms not found');
        });
    });

    describe('POST /api/forms/fetchformslist', () => {
        it('should fetch all forms', async () => {
            mockingoose(Form).toReturn([{ title: 'Form 1' }, { title: 'Form 2' }, { title: 'Form 3' }], 'find');

            const res = await request(app).get('/api/forms/fetchformslist');

            expect(res.statusCode).toBe(200);
            expect(res.body.docs).toHaveLength(3);
            expect(res.body.docs).toEqual(['Form 1', 'Form 2', 'Form 3']);
        });

        it('should return 400 if no forms found', async () => {
            mockingoose(Form).toReturn([], 'find');

            const res = await request(app).get('/api/forms/fetchformslist');

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Forms not found');
        });
    });

    describe('POST /api/forms/deleteform', () => {
        it('should delete a form by title', async () => {
            mockingoose(Form).toReturn({ _id: 'form1', title: 'Form to delete' }, 'findOne');

            const res = await request(app).post('/api/forms/deleteform').send({ title: 'Form to delete' });

            expect(res.statusCode).toBe(200);
            expect(res.text).toBe("\"Form deleted successfully\"");
        });
    });

    describe('POST /api/forms/updateformtitle', () => {
        it('should update the title of a form', async () => {
            mockingoose(Form).toReturn({ _id: 'form1', title: 'Old Form Title' }, 'findOne');

            const res = await request(app).post('/api/forms/updateformtitle').send({ oldTitle: 'Old Form Title', newTitle: 'New Form Title' });

            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Form title updated successfully');
        });

        it('should return 400 if form not found', async () => {
            mockingoose(Form).toReturn(null, 'findOne');

            const res = await request(app).post('/api/forms/updateformtitle').send({ oldTitle: 'Nonexistent Form', newTitle: 'New Title' });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Form not found');
        });
    });
});
