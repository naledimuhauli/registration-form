const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
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
    queueLimit: 0,
});

// Test the database connection
db.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if the database connection fails
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
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE google_id = ?', [profile.id]);

        if (rows.length > 0) {
            // User exists, proceed with authentication
            return done(null, rows[0]);
        } else {
            // User does not exist, create a new user without a password
            const [result] = await db.query('INSERT INTO users (google_id, name, email, password) VALUES (?, ?, ?, ?)', [
                profile.id,
                profile.displayName,
                profile.emails[0].value,
                null // No password for Google users
            ]);
            const newUser = {
                id: result.insertId,
                google_id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null // No password for Google users
            };
            return done(null, newUser);
        }
    } catch (error) {
        console.error('Database query error:', error);
        return done(error, null); // Handle errors in the database query
    }
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

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Landing page
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // Serve the registration.js file
        res.sendFile(path.join(__dirname, '../client/src/registration.js'));
    } else {
        res.redirect('/'); // Redirect to home page if not authenticated
    }
});

// Logout route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/'); // Redirect to landing page after logout
    });
});

// Fallback protected route with token authentication
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' }); // Respond with a JSON message
});

// Start the server
const PORT = process.env.PORT || 3000; // Define the port for the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
