import { useEffect } from 'react'
import { ImFileEmpty } from 'react-icons/im'
import { useTodos } from '../context/todoContext'
import { TodoCard } from '../components/todo/TodoCard'

export function TasksPage() {
  const { todos, getUserTodos, setTodos } = useTodos()

  useEffect(() => {
    getUserTodos()
    return () => setTodos([])
  }, [])

  return (
    <div className="md:p-8" >
      {todos.length > 0
        ? <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
          {todos.map((todo) => (
            <TodoCard todo={todo} key={todo._id} />
          ))}
        </div>
        : <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>}
    </div >
  )

}
