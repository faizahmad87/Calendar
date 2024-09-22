const express = require('express');
const User = require('../models/User'); // Assuming you have a User model in models/User.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production

// Register a new user
router.post('/register', async (req, res) => {
 const {email, password} = req.body;

 try {
  // Check if the user already exists
  let user = await User.findOne({where: {email}});
  if (user) {
   return res.status(400).json({msg: 'User already exists'});
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  user = await User.create({
   email,
   password: hashedPassword
   //firebaseUid // Store Firebase UID in the database
  });

  // Generate a token
  const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});

  // Send token and user data
  res.json({token, user: {id: user.id, email: user.email}});
 } catch (err) {
  console.error('Server error:', err);
  res.status(500).json({msg: 'Server error'});
 }
});

// Login an existing user
router.post('/login', async (req, res) => {
 const {email, password} = req.body;

 try {
  // Find the user by email
  const user = await User.findOne({where: {email}});
  if (!user) {
   return res.status(400).json({msg: 'User not found'});
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.status(400).json({msg: 'Invalid credentials'});
  }

  // Generate a token
  const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});

  // Send token and user data
  res.json({token, user: {id: user.id, email: user.email}});
 } catch (err) {
  console.error('Server error:', err);
  res.status(500).json({msg: 'Server error'});
 }
});

module.exports = router;
