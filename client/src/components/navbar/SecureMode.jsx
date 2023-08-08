import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { PrivateRoutes } from "../../routes/paths"
import { Link } from "react-router-dom"

function SecureMode() {
  const [isSecure, setIsSecure] = useState(true)
  const { user } = useAuth()

  return (
    <div className='flex justify-end px-2 items-center align-middle mb-4 gap-6'>
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only"
            onChange={() => setIsSecure(!isSecure)}
            checked={isSecure} />
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
            ? user.email.split('@')[0] + "@******"
            : user.email
        }
      </Link>
    </div>
  )
}

export default SecureMode