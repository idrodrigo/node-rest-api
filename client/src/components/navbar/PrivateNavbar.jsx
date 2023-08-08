import { Link, useNavigate } from "react-router-dom"
import { PrivateRoutes } from "../../routes/paths"
import { useAuth } from "../../context/authContext"
import { BsPersonCircle } from "react-icons/bs"
import { ButtonLink } from "../ui"

function PrivateNavbar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <>
      <ul>
        <li className='italic text-indigo-500 font-extrabold text-3xl'>
          <Link to={PrivateRoutes.TODO}>
            {user.email.split('@')[0]}Todo
          </Link>
        </li>
      </ul>

      <ul className='flex gap-4 justify-center pt-4 md:pt-0 items-center'>
        <li>
          <ButtonLink to={`/${PrivateRoutes.TODO}/${PrivateRoutes.NEWTODO}`}>New</ButtonLink>
        </li>
        <li>
          <button
            onClick={() => navigate(PrivateRoutes.PROFILE)}
            className=''>
            <BsPersonCircle className='inline-block align-middle' size={28} />
          </button>
        </li>
      </ul>
    </>
  )
}

export default PrivateNavbar