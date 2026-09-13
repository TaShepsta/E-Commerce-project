import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ownerRoutes from './routes/owner.js';
import productRoutes from './routes/products.js';
import { db } from './db.js';

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/owner', ownerRoutes)
app.use('/api/products', productRoutes)
app.listen(5050, () => console.log('Backend is running on http://localhost:5050'))