import express from 'express';
import multer from 'multer';
import { db } from '../db.js';


const router = express.Router();
const upload = multer ({ dest: 'uploads/'})
router.post('/list-product', upload.single('image'), async (req, res) => {
  const { title, category, price, location, description} = req.body
  const image_url = req.file? `/uploads/${req.file.filename}` : null
  await db.query (`INSERT INTO products (title, cetegory, price_per_day, location, description, image_url, status) VALUES (?, ?, ?, ?, ?, ?, 'Pending Inspection')`, [title, category, price, location, description, image_url])
  res.json({message: `${title} submitted for safety evaluation`})
})

export default router