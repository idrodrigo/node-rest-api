import { useEffect, useState } from 'react'
import { useTodos } from '../../context/todoContext'
import { Button, ButtonLink, Card } from '../ui'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Link } from 'react-router-dom'
dayjs.extend(utc)

export function TodoCard({ todo }) {
  const { deleteTodo, updateTodo } = useTodos()
  const [isCompleted, setIsCompleted] = useState(todo.completed)



  async function handleCompleted(todo) {
    try {
      await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed
      })
      setIsCompleted(!isCompleted)
    }
    catch (error) {
      console.log(error)
    }
  }

  const buttonColor = isCompleted ? 'bg-green-500' : 'bg-red-500'

  return (
    <Card className="font-normal text-sm">
      <header className="flex justify-between items-center pb-1">
        <button
          className={`border border-white rounded-lg px-4 ${buttonColor} hover:opacity-80 transition-all`}
          onClick={() => handleCompleted(todo)}>
          {isCompleted ? (
            <p className="">Completed</p>
          ) : (
            <p className="">Pending</p>
          )
          }
        </button>
        <button onClick={() => deleteTodo(todo._id)}>❌</button>
      </header>
      <h2 className="text-base font-medium">{todo.title}</h2>
      <section className='flex items-center justify-between'>
        <p className='text-xs text-gray-400'>
          {todo.date &&
            new Date(todo.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
        </p>
        <div className="flex gap-x-2 items-center justify-end">
          <ButtonLink to={`/todo/${todo._id}`}>Edit</ButtonLink>
        </div>
      </section>
    </Card >
  )
}
