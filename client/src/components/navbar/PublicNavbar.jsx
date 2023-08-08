import { PubblicRoutes } from "../../routes/paths";
import { ButtonLink } from "../ui";

function PublicNavbar() {
  return (
    <>
      <ul className='flex gap-4 justify-center '>
        <li>
          <ButtonLink to={PubblicRoutes.LOGIN}>Login</ButtonLink>
        </li>
        <li>
          <ButtonLink to={PubblicRoutes.REGISTER}>Register</ButtonLink>
        </li>
      </ul >
    </>
  )
}

export default PublicNavbar