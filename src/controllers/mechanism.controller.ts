// src/controllers/mechanism.controller.ts
import { Request, Response, NextFunction } from 'express';
import { borrowBookService, returnBookService } from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: bookId } = req.params;
        const userId = (req as any).user.id; // Get user ID from decoded token

        const result = await borrowBookService(bookId, userId);
        // if (!result) {
        //     res.status(404).json({
        //         status: 'error',
        //         message: 'Book not found'
        //     });
        //     return;
        // }
        res.status(200).json({
            status: 'success',
            message: 'Successfully borrowed book',
            data: {
                currentQty: result.currentQty
            }
        });
    } 
    
    catch (error: any) {
        res.status(400).send({
            status: "error",
            message: error.message,
            data: {},
        });
    }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: bookId } = req.params;
        const userId = (req as any).user.id; // User ID from the decoded token

        const result = await returnBookService(bookId, userId);

        // if (!result) {
        //     res.status(404).json({
        //         status: 'error',
        //         message: 'Book not found'
        //     });
        //     return;
        // }
        
        res.status(200).json({
            status: 'success',
            message: 'Successfully returned book',
            data: {
                currentQty: result.currentQty
            }
        });
    } 
    
    catch (error: any) {
        res.status(400).send({
            status: "error",
            message: error.message,
            data: {},
        });
    }
};
