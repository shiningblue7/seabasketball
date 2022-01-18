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
  if (!isAuthenticated) {
    return logInPage
  } else {
    return (
      <SignUpPlayer />
    )
  }
}


// const HomePage = () => {
  // return (
  //   <SignUpPlayer />
  // )
// }

// const HomePage = () => {
//     const { logIn } = useAuth()
//     let logInPage =  (
//           <>
//             Please login to see schedule
//             <br />
//             <button onClick={logIn}>
//             Log In
//             </button>
//           </>
//         )
//            return logInPage
// }
export default HomePage
