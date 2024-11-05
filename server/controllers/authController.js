
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate email and password
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 8 || !/\d/.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters and contain a number' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Store user in the database
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        // Generate JWT token
        const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const user = rows[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { registerUser, loginUser };
