import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Middleware untuk validasi input
const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Register user baru
export const register = [
  ...validateRegister,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        status: 'failed',
        message: 'Username, email, and password are required',
        data: {},
      });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const userData = await registerUser(username, email, hashedPassword);
      const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        token,
        data: userData,
      });
    } catch (error) {
      if ((error as any).code === 11000) { // Duplicate MongoDB error
        const duplicateField = Object.keys((error as any).keyValue)[0];
        res.status(409).json({
          status: 'failed',
          message: `The ${duplicateField} is already in use`,
          data: {},
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Failed to register user due to an internal error',
          data: {},
        });
      }
      return next(error);
    }
  },
];

// Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      status: 'failed',
      message: 'Username or password is required',
      data: {},
    });
    return;
  }

  try {
    const loginData = await loginUser(username, password);
    if (!loginData) {
      res.status(401).json({
        status: 'failed',
        message: 'Invalid credentials',
        data: {},
      });
      return;
    }

    const token = jwt.sign({ id: loginData._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      data: loginData,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An internal error occurred during login',
      data: {},
    });
    next(error);
  }
};
