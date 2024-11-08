import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password } = req.body;
     // Lanjutkan dengan logika register, seperti yang telah dijelaskan
    if (!username || !email || !password) {
        res.status(400).json({
            status: 'failed',
            message: 'Username, email, and password are required',
            data: {},
        });
        return;
    }

    try {
        const userData = await registerUser(username, email, password);
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: userData,
        });
    } 
  
    catch (error) {
        if ((error as any).code === 11000) { // 11000 adalah kode duplikat MongoDB
            const duplicateField = Object.keys((error as any).keyValue)[0];
            res.status(409).json({
                status: 'failed',
                message: `The ${duplicateField} is already in use`,
                data: {},
            });
        }

        else {
            res.status(500).json({  
                status: 'error',
                message: 'Failed to register user due to an internal error',
                data: {},
            });
        }
        return next(error); // panggil `next` utuk meneruskan error
    }
};

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
      res.status(200).json({
        status: 'success',
        message: 'Login success',
        data: loginData,
      });
    } catch (error) {
      res.status(401).json({
        status: 'failed',
        message: 'Invalid credentials',
        data: {},
      });
      next(error);
    }
};