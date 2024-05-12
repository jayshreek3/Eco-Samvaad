// src/controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  // Implementation for user registration
  try {
    const { username, email, password } = req.body;
    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res, next) => {
  // Implementation for user login
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProfile = async (req, res, next) => {
  // Implementation for getting user profile
  try {
    const userId = req.user.userId; // Extracted from JWT token in middleware
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res, next) => {
  // Implementation for updating user profile
  try {
    const userId = req.user.userId; // Extracted from JWT token in middleware
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
