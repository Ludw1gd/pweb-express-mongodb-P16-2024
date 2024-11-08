import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Register %% login route
router.post('/register', register);
router.post('/login', login);

export default router;
