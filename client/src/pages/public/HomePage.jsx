import { Link } from 'react-router-dom'
import { PubblicRoutes } from '../../routes/paths'
import { Card } from '../../components/ui'
import { useEffect } from 'react'
import { useTodos } from '../../context/todoContext'

function HomePage() {
  const { recentTodos, getRecentTodos } = useTodos([])

  useEffect(() => {
    getRecentTodos()
  }, [])

  return (
    <>
      <Card>
        <header className="bg-zinc-800 md:p-10 p-4 rounded-lg">
          <h1 className="text-5xl py-2 font-bold">React + Node Todo</h1>
          <p className="text-md text-slate-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
            fugit doloremque molestias recusandae labore repellat amet dicta tempore
            necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
            quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
            ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
            officia accusantium vitae doloremque, molestias modi.
          </p>

          <Link
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
            to={PubblicRoutes.REGISTER}
          >
            Get Started
          </Link>
        </header>
      </Card>
      <Card>
        <h1 className="text-3xl font-bold text-center mb-4">Recent Posts</h1>
        {[...recentTodos].map((all) => (
          <div key={all.id} className='rounded-lg m-2 border border-gray-500'>
            <section className="font-normal text-sm p-2 rounded-md hover:bg-zinc-900/20">
              <h2 className=" font-medium text-xl">{all.title}</h2>
              <section className='flex items-center justify-between'>
                <p className='text-xs text-gray-400'>
                  created at:{' '}
                  <span className='text-indigo-500'>
                    {all.createdAt &&
                      new Date(all.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  by:{' '}
                  <span className='text-indigo-500'>{all.user}</span>
                </p>
              </section>
            </section >
          </div>
        ))}
      </Card>

    </>
  )
}

export default HomePage
