import SignUpPlayer from 'src/components/SignUpPlayerCell'
import { Button, ButtonField, FieldError, Label, SelectField } from "@redwoodjs/forms"
import { useAuth } from 'src/auth'
const HomePage = () => {
  const { loading, logIn,logOut, isAuthenticated } = useAuth()
  let logInPage =  (
    <>
      Please login to see schedule
      <br />
      <button
      onClick={async () => {
          const searchParams = new URLSearchParams(window.location.search)
          await logIn({
            // appState: { targetUrl: searchParams.get('redirectTo') },
            appState: { targetUrl: '/' },
          })
        }
      }
    >
      Log In
    </button>
    </>
  )

  if (loading) {
    return <>Loading Homepage... </>
  }
  if (!isAuthenticated) {
    return logInPage
  } else {
    return (
      <SignUpPlayer />
    )
  }
}

export default HomePage
