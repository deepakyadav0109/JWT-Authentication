const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const checkTokenBlacklist = require('./middleware/blacklistMiddleware');

const app = express();

app.use(express.json());

// Mock user database (replace with actual database)
const users = [];

const JWT_SECRET = 'kgkgjwtsecretkey';

// Route for user registration
app.post('/api/auth/register', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if username already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };

    // Add new user to the database
    users.push(newUser);

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for user login
app.post('/api/auth/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user by username in the database
    const user = users.find(user => user.username === username);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with JWT token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
  });

// In-memory token blacklist
const tokenBlacklist = new Set();

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    tokenBlacklist.add(token);
  }
  res.json({ message: 'Logout successful' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

