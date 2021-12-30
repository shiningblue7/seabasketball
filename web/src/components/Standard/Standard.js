import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const Standard = ({ children }) => {
  const { logIn, logOut, isAuthenticated, userMetadata } = useAuth()
  // console.log('userMetadata', userMetadata)
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>Basketball Signup</Link>
        </h1>
        <nav>
          <ul>
            {/* <li>
              <Link to={routes.about()}>About</Link>
            </li> */}
            <li>
               {isAuthenticated && userMetadata.name}
               &nbsp; - &nbsp;
               {isAuthenticated && userMetadata.email}
               &nbsp;&nbsp;&nbsp;
              <button onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>
            </li>
            {isAuthenticated && (
              <>
            <li>
              <Link to={routes.users()}>Users</Link>
            </li>
            <li>
              <Link to={routes.schedules()}>Schedules</Link>
            </li>
            <li>
              <Link to={routes.signUps()}>Signup</Link>
            </li>
            </>
            )}


            {/* {isAuthenticated && <li>{userMetadata.name} [{userMetadata.email}]</li>} */}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default Standard
