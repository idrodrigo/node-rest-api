import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { ButtonLink } from './ui/ButtonLink'
import { PrivateRoutes, PubblicRoutes } from '../routes/paths'
import ReactLogo from '../assets/react.svg';
import nodeLogo from '../assets/node.svg';
import { useState } from 'react';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const [isSecure, setIsSecure] = useState(true)


  const navigate = useNavigate()

  function handleChange() {
    setIsSecure(!isSecure)
  }

  return (
    <>
      <nav className="bg-zinc-800 my-3 py-5 px-10 rounded-lg">
        <ul className="md:flex gap-x-20 md:justify-between md:text-left text-center items-center">
          <li className=''>
            <Link to={'/'}>
              <div className='flex justify-center gap-2 text-4xl items-center align-middle md:m-0 mb-4'>
                <img src={ReactLogo}></img>
                +
                <img src={nodeLogo}></img>
              </div>
            </Link>
          </li>
          {isAuthenticated
            ? (
              <>
                <li className='italic text-indigo-500 font-extrabold text-3xl'>
                  <Link to={PrivateRoutes.TODO}>
                    {user.email.split('@')[0]}Todo
                  </Link>
                </li>

                <div className='flex gap-4 justify-center pt-4 md:pt-0'>
                  <li>
                    <ButtonLink to={`/${PrivateRoutes.TODO}/${PrivateRoutes.NEWTODO}`}>New</ButtonLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (confirm('Please confirm you want to logout.')) {
                          logout()
                          return navigate('/')
                        }
                      }}
                      className='text-red-500'>
                      Logout
                    </button>
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

      {isAuthenticated &&
        <div className='flex justify-end px-2 items-center align-middle mb-4 gap-6'>
          <label htmlFor="toggleB" className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="toggleB" className="sr-only" onChange={() => setIsSecure(!isSecure)} checked={isSecure} />
              <div className="block bg-zinc-800 w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium hidden md:block">
              secure mode
            </div>
          </label>
          <Link
            to={PrivateRoutes.PROFILE}
            className='block flex-grow italic text-amber-500 font-medium text-end whitespace-nowrap overflow-hidden overflow-ellipsis'
          >
            {
              isSecure
                ? user.email.split('@')[0] + "@****"
                : user.email
            }
          </Link>
        </div>


      }
    </>
  )
}
