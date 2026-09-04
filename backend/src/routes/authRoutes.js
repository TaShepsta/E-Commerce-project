import express from 'express';
const router = express.Router();
import { register, login, getProfile } from '../controllers/authController.js';
import authenticate from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getProfile);

export default router;
