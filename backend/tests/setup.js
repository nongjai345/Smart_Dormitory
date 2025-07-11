// Test setup file
const fs = require('fs');
const path = require('path');

// Use in-memory database for testing
process.env.DB_PATH = ':memory:';
process.env.NODE_ENV = 'test';

// Clean up any test database files
beforeEach(() => {
    // Clean up any existing test database files
    const testDbPath = path.join(__dirname, '..', 'data', 'test.sqlite');
    if (fs.existsSync(testDbPath)) {
        fs.unlinkSync(testDbPath);
    }
});

// Set test timeout
jest.setTimeout(30000); 