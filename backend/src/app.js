import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import listingsRoutes from '../routes/listingsRoutes.js';
import earningsRoutes from '../routes/earningsRoutes.js';

import errorHandler, { notFound } from './middleware/errorHandler.js';
import pool from '../config/db.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

function extractLocation(description = '') {
    const match = description.match(/^Location:\s*([^\n]+)/i);
    return match ? match[1].trim() : '';
}

function formatProduct(listing) {
    const description = listing.description || '';

    const normalizedDescription = description
        .replace(/^Location:\s*[^\n]+\n\s*/i, '')
        .trim();

    return {
        id: listing.id,
        title: listing.name,
        name: listing.name,
        category: listing.category,
        description: normalizedDescription,
        location: extractLocation(description),
        status:
            listing.status === 'Available'
                ? 'Safety Verified'
                : listing.status,
        price_per_day: Number(listing.price),
        price: Number(listing.price),
        image_url: listing.image,
        image: listing.image,
        imageAlt: listing.imageAlt,
        image_alt: listing.imageAlt,
    };
};

// Health check
app.get('/api/health', async (req, res) => {
    try {
        const ownerId = Number(process.env.OWNER_ID || 1);

        const [[counts]] = await pool.query(
            `SELECT
                (SELECT COUNT(*) FROM listings WHERE owner_id = ?) AS listings,
                (SELECT COUNT(*) FROM rental_earnings WHERE owner_id = ?) AS earnings`,
            [ownerId, ownerId]
        );

        res.json({
            status: 'ok',
            database: 'connected',
            databaseName: process.env.DB_NAME || 'rentosphere',
            listings: Number(counts.listings),
            earnings: Number(counts.earnings),
        });
    } catch (error) {
        console.error(
            'Database health check failed:',
            error.code || error.message
        );

        res.status(503).json({
            status: 'degraded',
            database: 'unavailable',
            message:
                error.code ||
                'Check MySQL and backend/.env',
        });
    }
});

// Listing image
app.get('/api/listings/:id/image', async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT image_data, image_mime_type FROM listings WHERE id = ?',
            [req.params.id]
        );

        const listing = rows[0];

        if (!listing || !listing.image_data) {
            return res.status(404).json({
                message: 'Listing image not found',
            });
        }

        res.setHeader(
            'Content-Type',
            listing.image_mime_type || 'image/jpeg'
        );

        res.send(listing.image_data);
    } catch (error) {
        next(error);
    }
});

// Products
app.get('/api/products', async (req, res, next) => {
    try {
        const ownerId = Number(process.env.OWNER_ID || 1);

        const [rows] = await pool.query(
            `SELECT
                id,
                owner_id AS ownerId,
                item_name AS name,
                description,
                category,
                rental_price AS price,
                price_unit AS priceUnit,
                status,
                image_url AS image,
                image_alt AS imageAlt,
                created_at AS createdAt
             FROM listings
             WHERE owner_id = ?
             ORDER BY created_at DESC`,
            [ownerId]
        );

        const requestedStatus = String(
            req.query.status || ''
        ).trim();

        const items = rows.map(formatProduct);

        const filteredItems = requestedStatus
            ? items.filter(
                  (item) => item.status === requestedStatus
              )
            : items;

        res.json(filteredItems);
    } catch (error) {
        next(error);
    }
});

// Existing routes from develop
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);

// Additional routes from saajidah-dev
app.use('/api/listings/manage', listingsRoutes);
app.use('/api/earnings', earningsRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'E-commerce backend is running!',
    });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;