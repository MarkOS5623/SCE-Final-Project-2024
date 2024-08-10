const request = require('supertest');
const express = require('express');
const documentController = require('../controllers/documentController');
const Document = require('../models/document');
const User = require('../models/user');
const Status = require('../models/status');
const mockingoose = require('mockingoose');
const app = require('../server.js')

// Test suite for documentController
describe('documentController', () => {

    afterEach(() => {
        mockingoose.resetAll(); // Reset mocks after each test
    });

    describe('fetchUnsignedDocumentList', () => {
        it('should return 404 if no documents are found', async () => {
            mockingoose(Document).toReturn([], 'find');
            const res = await request(app).get('/api/documents/fetchunsigneddocumentlist');
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('No documents found');
        });

        it('should return unsigned documents', async () => {
            const documents = [
                {
                subject: 'Test Subject 1',
                documentId: '123',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
                }
            ];
            const statuses = [
                {
                _id: '610c34188c9a1e4ae4b7b8ff',
                status: 'unsigned'
                }
            ];
            mockingoose(Document).toReturn(documents, 'find');
            mockingoose(Status).toReturn(statuses, 'find');
            const res = await request(app).get('/api/documents/fetchunsigneddocumentlist');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                docs: ['Test Subject 1'],
                ids: ['123']
            });
        });
    });

    describe('fetchSignedDocumentList', () => {
        it('should return 404 if no documents are found', async () => {
            mockingoose(Document).toReturn([], 'find');
            const res = await request(app).get('/api/documents/fetchSignedDocumentList');
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('No documents found');
        });

        it('should return signed documents', async () => {
            const documents = [
                {
                subject: 'Test Subject 1',
                documentId: '123',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
                }
            ];
            const statuses = [
                {
                _id: '610c34188c9a1e4ae4b7b8ff',
                status: 'approved'
                }
            ];
            mockingoose(Document).toReturn(documents, 'find');
            mockingoose(Status).toReturn(statuses, 'find');
            const res = await request(app).get('/api/documents/fetchSignedDocumentList');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                docs: ['Test Subject 1'],
                ids: ['123'],
                statuses: ['approved']
            });
        });
    });

    describe('fetchDocument', () => {
        it('should return 404 if document not found', async () => {
            mockingoose(Document).toReturn(null, 'findOne');
            const res = await request(app).post('/api/documents/fetchdocument').send({ documentId: '123' });
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('Document not found');
        });

        it('should return the document', async () => {
            const document = {
                subject: 'Test Subject 1',
                documentId: '123',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
            };
            mockingoose(Document).toReturn({ _id: '66b72c9a61f4b20af23c1ac5', ...document }, 'findOne');
            const res = await request(app).post('/api/documents/fetchdocument').send({ documentId: '123' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(expect.objectContaining(document));
        });
    });

    describe('fetchDocumentAuthor', () => {
        it('should return 404 if document not found', async () => {
            mockingoose(Document).toReturn(null, 'findOne');
            const res = await request(app).post('/api/documents/fetchDocumentAuthor').send({ documentId: '123' });
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('Document not found');
        });

        it('should return 404 if user not found', async () => {
            const document = {
                _id: '66b72c9a61f4b20af23c1ac5',
                documentId: '123',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
            };
            mockingoose(Document).toReturn(document, 'findOne');
            mockingoose(User).toReturn(null, 'findOne');
            const res = await request(app).post('/api/documents/fetchdocumentauthor').send({ documentId: '123' });
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('Author not found');
        });

        it('should return the document author', async () => {
            const document = { _id: '66b72c9a61f4b20af23c1ac5', documentId: '123' };
            const user = { _id: '610c34188c9a1e4ae4b7b8ff', name: 'Test User', documents: [] };
            mockingoose(Document).toReturn(document, 'findOne');
            mockingoose(User).toReturn(user, 'findOne');
            const res = await request(app).post('/api/documents/fetchdocumentauthor').send({ documentId: '66b72c9a61f4b20af23c1ac5' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(expect.objectContaining({
            _id: user._id,
        }));
        });
    });

    describe('deleteDocuments', () => {
        it('should return 400 if input is invalid', async () => {
            const res = await request(app).post('/api/documents/deletedocuments').send({ documentIds: null });
            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Invalid input');
        });

        it('should return 404 if no documents are found to delete', async () => {
            mockingoose(Document).toReturn([], 'find');
                const res = await request(app).post('/api/documents/deletedocuments').send({ documentIds: ['66b72c9a61f4b20af23c1ac5'] });
                expect(res.statusCode).toBe(400);
                expect(res.text).toBe('No documents found to delete');
        });

        it('should delete documents and return success message', async () => {
            const documents = [
                {
                _id: '66b72c9a61f4b20af23c1ac5',
                documentId: '123',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
                }
            ];
            mockingoose(Document).toReturn(documents, 'find');
            mockingoose(Document).toReturn({}, 'deleteMany');
            const res = await request(app).post('/api/documents/deletedocuments').send({ documentIds: ['66b72c9a61f4b20af23c1ac5'] });
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Documents deleted successfully');
        });
    });

    describe('saveDocument', () => {
        it('should return 404 if document not found when updating', async () => {
            mockingoose(Document).toReturn(null, 'findOneAndUpdate');
            const res = await request(app).post('/api/documents/savedocument').send({
                documentId: '123',
                subject: 'Updated Subject',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
            });
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe('Document not found');
        });

        it('should update a document successfully', async () => {
            const updatedDocument = {
                _id: '66b72c9a61f4b20af23c1ac5',
                documentId: '123',
                subject: 'Updated Subject',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
            };
            mockingoose(Document).toReturn(updatedDocument, 'findOneAndUpdate');
            const res = await request(app).post('/api/documents/savedocument').send({
                documentId: '123',
                subject: 'Updated Subject',
                authorizers: ['610c34188c9a1e4ae4b7b8ff']
            });
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Document updated successfully');
        });
        
    });
});
