const express = require('express');
const bcrypt = require('bcryptjs'); // Using bcryptjs as it's easier to install across platforms
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const db = req.db; // Ensure db is correctly attached to the request

    // Input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password criteria
    if (password.length < 8 || !/\d/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number' });
    }

    try {
        // Check if the email is already in use
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]); // Removed promise() since db is already a promise pool
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        // Generate a JWT
        const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Registration failed due to server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = req.db;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find user by email
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = rows[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Login failed due to server error' });
    }
});

module.exports = router;
