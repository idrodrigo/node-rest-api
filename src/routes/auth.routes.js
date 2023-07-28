import Router from 'express'
import schemaValidator from '../middlewares/schemaValidador.middleware.js'
import { authSchema, loginSchema } from '../schemas/auth.schema.js'
import {
  login,
  logout,
  register,
  verifyToken
} from '../controllers/auth.controller.js'

const router = Router()
// /api/auth ----------------------------------------------->
router.get('/verify', verifyToken)
router.post('/register', schemaValidator(authSchema), register)
router.post('/login', schemaValidator(loginSchema), login)
router.post('/logout', logout)

export default router
