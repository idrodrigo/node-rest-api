import { createContext, useContext, useState } from 'react'
import {
  createTodoReq,
  deleteTodoReq,
  getRecentTodosReq,
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
  const [recentTodos, setRecentTodos] = useState([])

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
      console.log(res.status);
      if (res.status === 201) setTodos([...todos, res.data])
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
      const res = await updateTodoReq(id, todo)
      if (res.status === 200)
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)))
      // getUserTodos()
    } catch (error) {
      console.error(error)
    }
  }
  const getRecentTodos = async () => {
    try {
      const res = await getRecentTodosReq()
      setRecentTodos(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        recentTodos,
        getRecentTodos,
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
