// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected successfully');
});

// Routes
app.use('/auth', authRoutes);

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
