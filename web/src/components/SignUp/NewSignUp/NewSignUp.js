import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import SignUpForm from 'src/components/SignUp/SignUpForm'

const CREATE_SIGN_UP_MUTATION = gql`
  mutation CreateSignUpMutation($input: CreateSignUpInput!) {
    createSignUp(input: $input) {
      id
    }
  }
`

const NewSignUp = () => {
  const [createSignUp, { loading, error }] = useMutation(
    CREATE_SIGN_UP_MUTATION,
    {
      onCompleted: () => {
        toast.success('SignUp created')
        navigate(routes.signUps())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      scheduleId: parseInt(input.scheduleId),
      userId: parseInt(input.userId),
    })
    createSignUp({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SignUp</h2>
      </header>
      <div className="rw-segment-main">
        <SignUpForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSignUp
