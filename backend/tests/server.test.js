const request = require('supertest');
const app = require('../server');

describe('Server Basic Tests', () => {
    test('GET / should return API information', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('version');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Smart Dormitory Management System API');
    });

    test('GET /health should return health status', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);
        
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('database');
        expect(response.body.status).toBe('healthy');
    });

    test('GET /api/users should return empty array initially', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/rooms should return empty array initially', async () => {
        const response = await request(app)
            .get('/api/rooms')
            .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/users should create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword123',
            role: 'tenant'
        };

        const response = await request(app)
            .post('/api/users')
            .send(userData)
            .expect(201);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe(userData.username);
        expect(response.body.email).toBe(userData.email);
        expect(response.body.role).toBe(userData.role);
    });

    test('GET /nonexistent should return 404', async () => {
        const response = await request(app)
            .get('/nonexistent')
            .expect(404);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Route not found');
    });
});

describe('Database Integration Tests', () => {
    test('POST /api/rooms should create a new room', async () => {
        const roomData = {
            room_number: '101',
            floor: 1,
            room_type: 'single',
            capacity: 1,
            monthly_rent: 5000,
            description: 'Single room with private bathroom'
        };

        const response = await request(app)
            .post('/api/rooms')
            .send(roomData)
            .expect(201);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.room_number).toBe(roomData.room_number);
        expect(response.body.monthly_rent).toBe(roomData.monthly_rent);
    });

    test('GET /api/rooms should return the created room', async () => {
        const response = await request(app)
            .get('/api/rooms')
            .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
}); 