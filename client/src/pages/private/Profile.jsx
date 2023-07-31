import { useEffect } from "react"
import { ButtonLink, Card } from "../../components/ui"
import { useTodos } from "../../context/todoContext"
import { useAuth } from "../../context/authContext"

function Profile() {
  const { todos, getUserTodos, setTodos } = useTodos()
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserTodos();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => setTodos([]);
  }, []);
  console.log(user);



  return (
    <>
      <Card>
        <h2 className="text-3xl font-bold text-indigo-500">Profile</h2>
        <p className="text-end">
          you are user since{' '}
          <span className="text-indigo-500">
            {user.createdAt &&
              new Date(user.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
          </span>
        </p>
      </Card>

      <Card>
        {
          (todos.length > 0) &&
          <>
            <h3 className="text-3xl font-bold text-indigo-500 mb-4">Count: </h3>
            <section className='border-2 border-indigo-500 bg-zinc-800 rounded-lg  p-4'>
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
        <section className='md:border-2 border-red-500 bg-zinc-800 rounded-lg mb-6 md:p-4 '>
          <section className='bg-red-500 p-6 rounded-lg mb-2'>
            <p>
              ⚠️Unexpected bad things will happen if you don’t read this!
            </p>
          </section>
          <section className='bg-zinc-900/50 p-6 rounded-lg '>
            <p>
              By deleting your account, you will lose your profile and all your
              todos. This action is irreversible.
            </p>
          </section>
        </section>
        <div className="flex gap-6 md:justify-end justify-center items-center text-sm">
          <button className=" transition-all bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 ">
            Delete all your todos
          </button>
          <button className=" transition-all bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 ">
            Delete count
          </button>
        </div>
      </Card>
    </>
  )
}

export default Profile