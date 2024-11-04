const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize Express app

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Initialize session middleware for Passport.js
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Database connected successfully');
    connection.release();
});

// Middleware to attach the db to req
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Configure Google OAuth strategy with Passport.js
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Here, you could save the user profile information to the database if needed.
    return done(null, profile);
}));

// Serialize and deserialize user information
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
app.use('/auth', authRoutes);

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to the dashboard
        res.redirect('http://localhost:3001/dashboard');
    }
);

// Serve static files from the client/src directory
app.use(express.static(path.join(__dirname, '../client/src')));

// Landing page or dashboard route
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // Serve the registration.js file
        res.sendFile(path.join(__dirname, '../client/src/registration.js'));
    } else {
        res.redirect('/');
    }
});

// Logout route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Fallback protected route with token authentication
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
