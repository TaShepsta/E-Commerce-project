import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendPasswordResetEmail } from '../utils/mailer.js';

const SALT_ROUNDS = 10;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
}

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters.' });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Enter a valid email address.' });
        }

        const allowedRoles = ['owner', 'renter'];
        const finalRole = allowedRoles.includes(role) ? role : 'renter';

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({ name, email, passwordHash, role: finalRole });

        const token = generateToken(newUser);

        res.status(201).json({
            message: 'Account created successfully.',
            token,
            user: newUser
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Something went wrong while creating the account.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Logged in successfully.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Something went wrong while logging in.' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching the profile.' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        // Always respond the same way whether or not the email exists,
        // so this endpoint can't be used to check which emails are registered.
        const genericResponse = {
            message: 'If an account exists for that email, a reset link has been sent.'
        };

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(200).json(genericResponse);
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = hashToken(rawToken);
        const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

        await User.setResetToken(user.email, tokenHash, expiresAt);

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

        await sendPasswordResetEmail(user.email, resetUrl);

        res.status(200).json(genericResponse);
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: 'Token and new password are required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters.' });
        }

        const tokenHash = hashToken(token);
        const user = await User.findByValidResetTokenHash(tokenHash);

        if (!user) {
            return res.status(400).json({ message: 'This reset link is invalid or has expired.' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        await User.updatePasswordAndClearResetToken(user.id, passwordHash);

        res.status(200).json({ message: 'Your password has been reset. You can now log in.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};