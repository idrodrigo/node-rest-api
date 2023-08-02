import { useEffect, useState } from 'react'
import { useTodos } from '../../context/todoContext'
import { Button, ButtonLink, Card } from '../ui'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PrivateRoutes } from '../../routes/paths'
dayjs.extend(utc)

export function TodoCard({ todo }) {
  const { deleteTodo, updateTodo } = useTodos()

  async function handleCompleted(todo) {
    updateTodo(todo._id, {
      ...todo,
      completed: !todo.completed
    })
  }

  const buttonColor = todo.completed ? 'bg-green-500' : 'bg-red-500'

  return (
    <>
      <section className="font-normal text-sm bg-zinc-800 p-6 rounded-lg hover:bg-zinc-800/50">
        <header className="flex justify-between items-center pb-1">
          <h2 className="text-xl font-medium">{todo.title}</h2>
          <button onClick={() => deleteTodo(todo._id)}>❌</button>
        </header>
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
        </section>
        <div className='flex justify-between pt-2'>
          <button
            className={`rounded-lg px-2 text-xs ${buttonColor} hover:opacity-80 transition-all`}
            onClick={() => handleCompleted(todo)}>
            {todo.completed ? (
              <p className="">Completed </p>
            ) : (
              <p className="">Pending</p>
            )
            }
          </button>
          <div className="flex gap-x-1 items-center justify-end">
            <ButtonLink
              to={PrivateRoutes.EDITTODO.replace(':todoId', todo._id)}>
              Edit
            </ButtonLink>
          </div>
        </div>

      </section >
    </>
  )
}
