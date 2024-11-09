// src/controllers/mechanism.controller.ts
import { Request, Response, NextFunction } from 'express';
import { borrowBookService } from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: bookId } = req.params;
        const userId = (req as any).user.id; // Get user ID from decoded token

        const result = await borrowBookService(bookId, userId);

        res.status(200).json({
            status: 'success',
            message: 'Successfully borrowed book',
            data: {
                currentQty: result.currentQty
            }
        });
    } catch (error) {
        next(error);
    }
};
