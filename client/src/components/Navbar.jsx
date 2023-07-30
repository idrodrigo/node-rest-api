import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { ButtonLink } from './ui/ButtonLink'
import { PrivateRoutes, PubblicRoutes } from '../models/routes'

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="bg-zinc-800 my-3 py-5 px-10 rounded-lg">
      <ul className="md:flex gap-x-20 justify-end md:text-left text-center items-center">
        {isAuthenticated
          ? (
            <>
              <li className='italic text-indigo-500 font-extrabold text-3xl'>
                <Link to={PrivateRoutes.PRIVATE}>
                  {user.email.split('@')[0]}Todo
                </Link>
              </li>
              <li className='flex-grow italic text-amber-500 font-medium'>
                <Link to={PrivateRoutes.PROFILE}>
                {user.email}
                </Link>
              </li>
              <div className='flex gap-4 justify-center pt-4 md:pt-0'>
                <li>
                  <ButtonLink to={`${PrivateRoutes.TODO}/${PrivateRoutes.NEWTODO}`}>New</ButtonLink>
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
                  <ButtonLink to={PubblicRoutes.LOGIN}>Login</ButtonLink>
                </li>
                <li>
                  <ButtonLink to={PubblicRoutes.REGISTER}>Register</ButtonLink>
                </li>
              </div>
            </>
          )}
      </ul>
    </nav >
  )
}
