import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, phone, email, age, state } = req.body;
  
  let user = await User.findOne({ phone });
  if (user) {
    return next(new ErrorResponse('User already exists with this phone number', 400));
  }

  user = await User.create({ name, phone, email, age, state });
  const token = generateToken(user._id);

  res.status(201).json({ success: true, token, user });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;
  
  if (!phone) {
    return next(new ErrorResponse('Please provide a phone number', 400));
  }

  const user = await User.findOne({ phone });
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = generateToken(user._id);
  res.status(200).json({ success: true, token, user });
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({ success: true, user });
});
