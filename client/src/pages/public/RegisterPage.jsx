import { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Message, Button, Input, Label } from '../../components/ui'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrivateRoutes, PubblicRoutes } from '../../models/routes'

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })
  const navigate = useNavigate()

  const onSubmit = async (value) => {
    await signup(value)
  }

  useEffect(() => {
    if (isAuthenticated) navigate(`/${PrivateRoutes.PRIVATE}`)
  }, [isAuthenticated])

  return (
      <Card>
      <div className='m-12 p-6 border-2 border-indigo-500 rounded-lg'>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button>Submit</Button>
        </form>
        <p className='flex justify-between'>
          <span>Already Have an Account?</span>
          <Link className="text-sky-500" to={`/${PubblicRoutes.LOGIN}`}>
            Login
          </Link>
        </p>
        </div>
      </Card>

  )
}

export default Register
