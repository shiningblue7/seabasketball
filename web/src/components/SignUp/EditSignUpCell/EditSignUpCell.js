import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import SignUpForm from 'src/components/SignUp/SignUpForm'

export const QUERY = gql`
  query EditSignUpById($id: Int!) {
    signUp: signUp(id: $id) {
      id
      scheduleId
      userId
      createdAt
    }
  }
`
const UPDATE_SIGN_UP_MUTATION = gql`
  mutation UpdateSignUpMutation($id: Int!, $input: UpdateSignUpInput!) {
    updateSignUp(id: $id, input: $input) {
      id
      scheduleId
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ signUp }) => {
  const [updateSignUp, { loading, error }] = useMutation(
    UPDATE_SIGN_UP_MUTATION,
    {
      onCompleted: () => {
        toast.success('SignUp updated')
        navigate(routes.signUps())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      scheduleId: parseInt(input.scheduleId),
      userId: parseInt(input.userId),
    })
    updateSignUp({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit SignUp {signUp.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SignUpForm
          signUp={signUp}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
