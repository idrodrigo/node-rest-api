import User from '../database/models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import createAccessToken from '../libs/jwt.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })

    if (userFound) {
      return res
        .status(409)
        .json({
          message: ['The email is already in use']
        })
    }

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10)

    // creating the user
    const newUser = new User({
      email,
      password: passwordHash
    })

    // saving the user in the database
    const userSaved = await newUser.save()

    // create access token
    const token = await createAccessToken({
      id: userSaved._id
    })
    // httpOnly: true, lo que impide que el cliente acceda a la cookie desde el código JavaScript.
    // Es una configuración segura y recomendada para evitar ataques de secuestro de cookies (XSS).

    // secure: true: Al establecer secure en true, estás indicando que la cookie solo se enviará
    // al servidor si la conexión es segura (HTTPS). Esto es esencial para garantizar que la cookie
    // no se envíe en texto claro a través de conexiones no seguras. Por lo tanto, en un entorno de
    // producción con una conexión HTTPS configurada, esto debería funcionar correctamente.

    // sameSite: '': Aquí estás estableciendo sameSite en una cadena vacía '',
    // lo que equivale a usar 'strict'. Esto significa que la cookie solo se enviará en solicitudes
    // del mismo sitio, lo cual es una configuración segura para evitar ataques de CSRF.

    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV !== 'development',
      // secure: true,
      // sameSite: ''
    })

    res.json({
      id: userSaved._id,
      email: userSaved.email,
      createdAt: userSaved.createdAt
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message })
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(404).json({
        message: ['The password or email is incorrect']
      })
    }

    const isPassword = await bcrypt.compare(password, userFound.password)
    if (!isPassword) {
      return res
        .status(401)
        .json({ message: ['The password or email is incorrect'] })
    }
    const token = await createAccessToken({
      id: userFound._id
    })

    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV !== 'development',
      // secure: true,
      // sameSite: ''
    })

    res.json({
      id: userFound._id,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message })
  }
}
export const verifyToken = async (req, res) => {
  const token = req.headers.cookie?.split('=')[1]
  // console.log(req.headers.cookie?.split('=')[1])
  if (!token) return res.send(false)

  jwt.verify(token, process.env.SECRET_TOKEN, async (error, user) => {
    if (error) return res.sendStatus(401)

    const userFound = await User.findById(user.id)
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound._id,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  })
}
export const logout = (req, res) => {
  const tokenExists = req.headers.cookie?.split('=')[1]
  // console.log(req.headers.cookie?.split('=')[1])
  if (tokenExists) {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0)
    })
    return res
      .status(200)
      .json({ message: 'Logout successful' })
  } else {
    return res
      .status(404)
      .json({ message: 'No token found. Already logged out.' })
  }
}
