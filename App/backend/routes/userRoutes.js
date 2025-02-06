// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const pool = require('../models/db');

router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;