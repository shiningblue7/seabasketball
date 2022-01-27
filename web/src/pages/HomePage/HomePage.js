import SignUpPlayer from 'src/components/SignUpPlayerCell'
import { useAuth } from '@redwoodjs/auth'
const HomePage = () => {
  const { logIn, isAuthenticated } = useAuth()

  let logInPage =  (
    <>
      Please login to see schedule
      <br />
      <button onClick={logIn}>
      Log In
      </button>
    </>
  )
  // if (!isAuthenticated) {
  //   return logInPage
  // } else {
    return (
      <SignUpPlayer />
    )
  // }
}

export default HomePage
