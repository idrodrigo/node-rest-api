import { useAuth } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Message, Button, Input, Label } from '../../components/ui'
import { loginSchema } from '../../schemas/auth'
import { PrivateRoutes, PubblicRoutes } from '../../models/routes'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const { signin, errors: loginErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (data) => signin(data)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${PrivateRoutes.TODO}`)
    }
  }, [isAuthenticated])

  return (
    
      <Card>
        <div className='m-12 p-6 border-2 border-indigo-500 rounded-lg'>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email:</Label>
          <Input
            label="Write your email"
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            {...register('email', { required: true })}
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
            {...register('password', { required: true, minLength: 6 })}
          />
          <p className="text-red-500">{errors.password?.message}</p>

          <Button>Login</Button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an account? 
          <Link 
            navigate
            to={`/${PubblicRoutes.REGISTER}`} 
            className="text-sky-500">
            Sign up
          </Link>
        </p>
        </div>
      </Card>
  )
}

export default LoginPage