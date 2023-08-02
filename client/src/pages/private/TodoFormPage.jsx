import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Button, Card, Input, Label } from '../../components/ui'
import { useForm } from 'react-hook-form'
import { useTodos } from '../../context/todoContext'
import { PrivateRoutes } from '../../routes/paths'
dayjs.extend(utc)


function TodoFormPage() {
  const { createTodo, getTodo, updateTodo } = useTodos()
  const navigate = useNavigate()
  const { todoId } = useParams()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const date = data.date
      ? dayjs.utc(data.date).format()
      : dayjs.utc().format()

    try {
      if (todoId) {
        await updateTodo(todoId, {
          ...data,
          completed: false,
          date
        })
      } else {
        createTodo({
          ...data,
          completed: false,
          date
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate(`/${PrivateRoutes.TODO}`)
    }
  }

  useEffect(() => {
    async function loadTodo() {
      if (todoId) {
        const todo = await getTodo(todoId)
        if (!todo) {
          // alert('Todo not found')
          return navigate(`/${PrivateRoutes.TODO}`)
        }
        setValue('title', todo.title)
        setValue('completed', todo.completed)
        setValue(
          'date',
          todo.date ? dayjs(todo.date).utc().format('YYYY-MM-DD') : ''
        )
      }
    }
    loadTodo()
  }, [todoId])

  return (
    <div className='mb-4'>
      <Card>
        <button
          className='block justify-end w-full text-right'
          onClick={() => navigate(`/${PrivateRoutes.TODO}`)}>❌</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register('title', { required: true })}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register('date')} />

          <Button>Save</Button>

        </form>
      </Card>
    </div>

  )
}

export default TodoFormPage