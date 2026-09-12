import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use('/api/chat', chatRoutes)

// Authentication
app.use('/api/auth', authRoutes)


app.get('/', (req, res) => {
  res.json({
    message: 'Rentosphere API is running'
  })
})


app.get('/api/test-db', async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT DATABASE() AS database_name'
    )

    res.json({
      success: true,
      database: rows[0].database_name
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    })

  }

})


app.listen(PORT, () => {

  console.log(`
=================================
  Rentosphere API
=================================
  Server: http://localhost:${PORT}
  Database: ${process.env.DB_NAME}
=================================
  `)

})