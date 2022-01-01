import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Fragment } from 'react'

const Standard = ({ children }) => {
  const { logIn, logOut, hasRole, isAuthenticated, userMetadata } = useAuth()
  return (
    <>

      <header>


        <nav>
          <ul>

            { hasRole(['admin']) && (
              <Fragment>
            <li>
              <Link to={routes.users()}>Users</Link>
            </li>
            <li>
              <Link to={routes.schedules()}>Schedules</Link>
            </li>
            <li>
              <Link to={routes.signUps()}>Signups</Link>
            </li>
            </Fragment>
            )}
            <li className='float-right'>
              {/* <font color="white">{isAuthenticated && userMetadata.name}</font> */}
               {/* {isAuthenticated && userMetadata.name}
               &nbsp; - &nbsp;
               {isAuthenticated && userMetadata.email}
               &nbsp;&nbsp;&nbsp; */}
              <button onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>

            </li>


            {/* {isAuthenticated && <li>{userMetadata.name} [{userMetadata.email}]</li>} */}
          </ul>
        </nav>
        <h1>
          <Link to={routes.home()}>Basketball Signup</Link>
        </h1>
      </header>
      <main>{children}</main>

    </>
  )
}

export default Standard
