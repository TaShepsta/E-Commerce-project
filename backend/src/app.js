import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Rentosphere API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

app.use(errorHandler);

export default app;