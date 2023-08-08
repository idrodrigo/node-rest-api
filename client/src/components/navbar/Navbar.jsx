import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { ButtonLink } from '../ui/ButtonLink'
import { PrivateRoutes, PubblicRoutes } from '../../routes/paths'
import ReactLogo from '../../assets/react.svg';
import nodeLogo from '../../assets/node.svg';
import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import PublicNavbar from './PublicNavbar';
import PrivateNavbar from './PrivateNavbar';
import SecureMode from './SecureMode';


function Navbar() {
  const { isAuthenticated } = useAuth()


  return (
    <>
      <nav className="bg-zinc-800 my-3 py-5 px-10 rounded-lg">
        <div className="md:flex gap-x-20 md:justify-between md:text-left text-center items-center">
          <ul>
            <li className=''>
              <Link to={'/'}>
                <div className='flex justify-center gap-2 text-4xl items-center align-middle md:m-0 mb-4'>
                  <img src={ReactLogo} alt='react logo'></img>
                  +
                  <img src={nodeLogo} alt='node logo'></img>
                </div>
              </Link>
            </li>
          </ul>
          {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        </div >
      </nav >

      {isAuthenticated && <SecureMode />}
    </>
  )
}

export default Navbar
