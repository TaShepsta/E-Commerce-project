import bcrypt from 'bcrypt'
import pool from '../db.js'


export async function signup(req, res) {

  const connection = await pool.getConnection()

  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    } = req.body


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.'
      })
    }


    // ==========================================
    // NORMALIZE INPUT
    // ==========================================

    const cleanEmail = email
      .trim()
      .toLowerCase()

    const cleanRole = role
      .trim()
      .toUpperCase()


    // ==========================================
    // ONLY ALLOW OWNER OR RENTER SIGNUP
    // ==========================================

    const allowedRoles = [
      'OWNER',
      'RENTER'
    ]

    if (!allowedRoles.includes(cleanRole)) {

      return res.status(400).json({
        success: false,
        message: 'Invalid account type.'
      })

    }


    // ==========================================
    // BASIC PASSWORD VALIDATION
    // ==========================================

    if (password.length < 8) {

      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters.'
      })

    }


    // ==========================================
    // CHECK EXISTING EMAIL
    // ==========================================

    const [existingUsers] = await connection.execute(
      `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [cleanEmail]
    )


    if (existingUsers.length > 0) {

      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      })

    }


    // ==========================================
    // HASH PASSWORD
    // ==========================================

    const passwordHash = await bcrypt.hash(
      password,
      12
    )


    // ==========================================
    // START TRANSACTION
    // ==========================================

    await connection.beginTransaction()


    // ==========================================
    // CREATE USER
    // ==========================================

    const [userResult] = await connection.execute(
      `
        INSERT INTO users
        (
          first_name,
          last_name,
          email,
          phone,
          password_hash
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        firstName.trim(),
        lastName.trim(),
        cleanEmail,
        phone?.trim() || null,
        passwordHash
      ]
    )


    const userId = userResult.insertId


    // ==========================================
    // FIND ROLE
    // ==========================================

    const [roles] = await connection.execute(
      `
        SELECT id
        FROM roles
        WHERE name = ?
        LIMIT 1
      `,
      [cleanRole]
    )


    if (roles.length === 0) {

      await connection.rollback()

      return res.status(500).json({
        success: false,
        message: 'Account role could not be found.'
      })

    }


    const roleId = roles[0].id


    // ==========================================
    // ASSIGN ROLE
    // ==========================================

    await connection.execute(
      `
        INSERT INTO user_roles
        (
          user_id,
          role_id
        )
        VALUES (?, ?)
      `,
      [
        userId,
        roleId
      ]
    )


    // ==========================================
    // COMMIT
    // ==========================================

    await connection.commit()


    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message: `${
        cleanRole === 'OWNER'
          ? 'Owner'
          : 'Renter'
      } account created successfully.`,

      user: {
        id: userId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: cleanEmail,
        phone: phone?.trim() || null,
        role: cleanRole
      }
    })


  } catch (error) {

    await connection.rollback()

    console.error(
      'Signup error:',
      error
    )


    // Duplicate email fallback
    if (error.code === 'ER_DUP_ENTRY') {

      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      })

    }


    return res.status(500).json({
      success: false,
      message: 'Unable to create account.'
    })


  } finally {

    connection.release()

  }

}