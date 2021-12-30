import SignUp from 'src/components/SignUp/SignUp'

export const QUERY = gql`
  query FindSignUpById($id: Int!) {
    signUp: signUp(id: $id) {
      id
      order
      scheduleId
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>SignUp not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ signUp }) => {
  return <SignUp signUp={signUp} />
}
