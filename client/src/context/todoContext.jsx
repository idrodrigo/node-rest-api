import { createContext, useContext, useState } from 'react'
import {
  createTodoReq,
  deleteTodoReq,
  getTodoReq,
  getUserTodosReq,
  updateTodoReq
} from '../api/todo'

const TaskContext = createContext()

export const useTodos = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTodos must be used within a TaskProvider')
  return context
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([])

  const getUserTodos = async () => {
    try {
      const res = await getUserTodosReq()
      setTodos(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const deleteTodo = async (id) => {
    try {
      const res = await deleteTodoReq(id)
      if (res.status === 204) setTodos(todos.filter((task) => task._id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  const createTodo = async (task) => {
    try {
      const res = await createTodoReq(task)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getTodo = async (id) => {
    try {
      const res = await getTodoReq(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
  const updateTodo = async (id, todo) => {
    try {
      await updateTodoReq(id, todo)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        todos,
        setTodos,
        getUserTodos,
        deleteTodo,
        createTodo,
        getTodo,
        updateTodo
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
