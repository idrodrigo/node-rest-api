import { useEffect } from "react"
import { Card, ButtonDanger } from "../../components/ui"
import { useTodos } from "../../context/todoContext"
import { useAuth } from "../../context/authContext"
import { FiAlertTriangle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function Profile() {
  const { todos, getUserTodos, setTodos } = useTodos()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getUserTodos();
    return () => setTodos([]);
  }, []);

  return (
    <>
      <Card>
        <h2 className="text-3xl font-bold text-indigo-500">Profile</h2>
        <p className="py-4">
          you are user since:{' '}
          <span className="text-indigo-500 md:inline-block block">
            {user.createdAt &&
              new Date(user.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
          </span>
        </p>
        <div className="flex justify-end">
          <ButtonDanger onClick={() => {
            if (confirm('Please confirm you want to logout.')) {
              logout()
              return navigate('/')
            }
          }}>
            Logout
          </ButtonDanger>

        </div>
      </Card>

      <Card>
        {
          (todos.length > 0) &&
          <>
            <h3 className="text-3xl font-bold text-indigo-500 mb-4">Count: </h3>
            <section className='bg-zinc-800 p-2'>
              <p>
                Total:{' '}
                <span className="text-indigo-500">{todos.length}</span>
              </p>
              <p>
                completed: <span className="text-indigo-500">{
                  todos.filter((todo) => todo.completed).length
                }</span>
              </p>
              <p>
                pending: <span className="text-indigo-500">{
                  todos.filter((todo) => !todo.completed).length
                }</span>
              </p>
            </section>
          </>
        }

      </Card>
      <Card>
        <h3 className="text-3xl font-bold text-red-500 mb-4">Danger</h3>
        <section className='bg-zinc-800 rounded-lg mb-6'>
          <section className='bg-red-500 p-4 rounded-lg mb-4'>
            <div className="flex justify-center items-center gap-3">
              <FiAlertTriangle />
              <p>
                Unexpected bad things will happen if you don’t read this!
              </p>
            </div>

          </section>
          <section className='bg-zinc-900/50 p-4 rounded-lg '>
            <p>
              By deleting your account, you will lose your profile and all your
              todos. This action is irreversible.
            </p>
          </section>
        </section>
        <div className="flex gap-6 md:justify-end justify-center items-center">
          <ButtonDanger>
            Delete all
          </ButtonDanger>
          <ButtonDanger>
            Delete acount
          </ButtonDanger>
        </div>
      </Card >
    </>
  )
}

export default Profile