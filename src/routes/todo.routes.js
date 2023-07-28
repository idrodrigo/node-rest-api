import Router from 'express'
import auth from '../middlewares/auth.middleware.js'
import schemaValidator from '../middlewares/schemaValidador.middleware.js'
import createTaskSchema from '../schemas/todo.schema.js'
import {
  createTodo,
  deleteTodo,
  getTodo,
  getUserTodos,
  updateTodo
} from '../controllers/todo.controller.js'

const router = Router()
// /api --------------------------------------------------->
router.get('/todo', auth, getUserTodos)
router.get('/todo/:id', auth, getTodo)
router.post('/todo', auth, schemaValidator(createTaskSchema), createTodo)
router.put('/todo/:id', auth, updateTodo)
router.delete('/todo/:id', auth, deleteTodo)

export default router
