import axios from './axios'

export const getUserTodosReq = async () => 
  axios.get('/todo')

export const createTodoReq = async (todo) => 
  axios.post('/todo', todo)

export const updateTodoReq = async (id, todo) =>
  axios.put(`/todo/${id}`, todo)

export const deleteTodoReq = async (id) => 
  axios.delete(`/todo/${id}`)

export const getTodoReq = async (id) => 
  axios.get(`/todo/${id}`)

export const getRecentTodosReq = async () =>
  axios.get('/all')

