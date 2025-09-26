const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const auth = require('../middleware/auth');

const router = express.Router();

// ============================
// Register User
// ============================
router.post('/register', async (req, res) => {
  try {
    const { name = '', email = '', password = '' } = req.body || {};

    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        message: 'Name must be at least 2 characters',
        code: 'VALIDATION_ERROR',
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: 'Invalid email address',
        code: 'VALIDATION_ERROR',
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
        code: 'VALIDATION_ERROR',
      });
    }

    const existing = await User.findOne({
      email: email.toLowerCase().trim(),
    }).lean();
    if (existing) {
      return res.status(409).json({
        message: 'Email already registered',
        code: 'CONFLICT',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '2d' }
    );

    const publicUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: publicUser,
    });
  } catch (err) {
    console.error('❌ REGISTER_ERROR', err);
    return res.status(500).json({
      message: 'Server error during registration',
      code: 'SERVER_ERROR',
    });
  }
});

// ============================
// Login User
// ============================
router.post('/login', async (req, res) => {
  try {
    const { email = '', password = '' } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Email and password are required',
          code: 'VALIDATION_ERROR',
        },
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!user) {
      return res.status(401).json({
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
      });
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '2d' }
    );

    // Response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('LOGIN_ERROR', err);
    return res.status(500).json({
      error: { message: 'Server error during login', code: 'SERVER_ERROR' },
    });
  }
});

// ============================
// Get Logged-In User
// ============================
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: { message: 'User not found', code: 'NOT_FOUND' },
      });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('ME_ERROR', err);
    return res.status(500).json({
      error: { message: 'Server error fetching profile', code: 'SERVER_ERROR' },
    });
  }
});

// ============================
// Logout User
// ============================
router.post('/logout', auth, async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Logout successful',
    });
  } catch (err) {
    console.error('LOGOUT_ERROR', err);
    return res.status(500).json({
      error: { message: 'Server error during logout', code: 'SERVER_ERROR' },
    });
  }
});

module.exports = router;
