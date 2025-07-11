const express = require('express');
const sqlite = require('better-sqlite3');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite database
const dbPath = process.env.DB_PATH || './data/database.sqlite';
const db = sqlite(dbPath, { verbose: console.log });

// Database initialization
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'tenant',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tenants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        emergency_contact TEXT,
        room_number TEXT,
        lease_start DATE,
        lease_end DATE,
        deposit_amount DECIMAL(10,2),
        monthly_rent DECIMAL(10,2),
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_number TEXT UNIQUE NOT NULL,
        floor INTEGER,
        room_type TEXT,
        capacity INTEGER,
        monthly_rent DECIMAL(10,2),
        status TEXT DEFAULT 'available',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tenant_id INTEGER NOT NULL,
        bill_type TEXT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        due_date DATE NOT NULL,
        status TEXT DEFAULT 'pending',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants (id)
    );
`);

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Smart Dormitory Management System API',
        version: '1.0.0',
        status: 'running'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected'
    });
});

// Users endpoints
app.get('/api/users', (req, res) => {
    try {
        const users = db.prepare('SELECT id, username, email, role, created_at FROM users').all();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/users', (req, res) => {
    try {
        const { username, email, password, role = 'tenant' } = req.body;
        const stmt = db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
        const result = stmt.run(username, email, password, role);
        res.status(201).json({ 
            id: result.lastInsertRowid,
            username,
            email,
            role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tenants endpoints
app.get('/api/tenants', (req, res) => {
    try {
        const tenants = db.prepare(`
            SELECT t.*, u.username, u.email 
            FROM tenants t 
            JOIN users u ON t.user_id = u.id
        `).all();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/tenants', (req, res) => {
    try {
        const { 
            user_id, first_name, last_name, phone, emergency_contact,
            room_number, lease_start, lease_end, deposit_amount, monthly_rent
        } = req.body;
        
        const stmt = db.prepare(`
            INSERT INTO tenants (
                user_id, first_name, last_name, phone, emergency_contact,
                room_number, lease_start, lease_end, deposit_amount, monthly_rent
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(
            user_id, first_name, last_name, phone, emergency_contact,
            room_number, lease_start, lease_end, deposit_amount, monthly_rent
        );
        
        res.status(201).json({ 
            id: result.lastInsertRowid,
            ...req.body
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rooms endpoints
app.get('/api/rooms', (req, res) => {
    try {
        const rooms = db.prepare('SELECT * FROM rooms ORDER BY room_number').all();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/rooms', (req, res) => {
    try {
        const { room_number, floor, room_type, capacity, monthly_rent, description } = req.body;
        const stmt = db.prepare(`
            INSERT INTO rooms (room_number, floor, room_type, capacity, monthly_rent, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(room_number, floor, room_type, capacity, monthly_rent, description);
        res.status(201).json({ 
            id: result.lastInsertRowid,
            ...req.body
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bills endpoints
app.get('/api/bills', (req, res) => {
    try {
        const bills = db.prepare(`
            SELECT b.*, t.first_name, t.last_name, t.room_number
            FROM bills b
            JOIN tenants t ON b.tenant_id = t.id
            ORDER BY b.due_date DESC
        `).all();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bills', (req, res) => {
    try {
        const { tenant_id, bill_type, amount, due_date, description } = req.body;
        const stmt = db.prepare(`
            INSERT INTO bills (tenant_id, bill_type, amount, due_date, description)
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(tenant_id, bill_type, amount, due_date, description);
        res.status(201).json({ 
            id: result.lastInsertRowid,
            ...req.body
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database: ${dbPath}`);
});

module.exports = app; 