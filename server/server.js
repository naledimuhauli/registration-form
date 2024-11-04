// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
