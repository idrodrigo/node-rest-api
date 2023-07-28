import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { ButtonLink } from './ui/ButtonLink'

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="bg-zinc-800 my-3 py-5 px-10 rounded-lg">
      <ul className="md:flex gap-x-4 justify-end md:text-left text-center">
        {isAuthenticated
          ? (
            <>
              <li className='flex-grow italic text-amber-500 font-medium'>
                {user.email}
              </li>
              <div className='flex gap-4 justify-center pt-4 md:pt-0'>
                <li>
                  <ButtonLink to="/todo/new">New</ButtonLink>
                </li>
                <li>
                  <Link to="/" onClick={() => logout()}>
                    Logout
                  </Link>
                </li>
              </div>
            </>
          )
          : (
            <>
              <div className='flex gap-4 justify-center '>
                <li>
                  <ButtonLink to="/login">Login</ButtonLink>
                </li>
                <li>
                  <ButtonLink to="/register">Register</ButtonLink>
                </li>
              </div>
            </>
          )}
      </ul>
    </nav >
  )
}
