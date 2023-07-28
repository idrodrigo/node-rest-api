import { Link } from 'react-router-dom'

export const ButtonLink = ({ to, children }) => (
  <Link to={to}
    className=" transition-all bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600 ">
    {children}
  </Link>
)
