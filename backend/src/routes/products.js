import express from 'express'
import { db } from '../db.js'

const router = express.Router()
router.get('/', async (req, res) => {
  const status = req.query.status || 'Safety Verified'
  const [rows] = await db.query(`SELECT * FROM products WHERE status = ? `, [status])
  res.json(rows)
})
export default router