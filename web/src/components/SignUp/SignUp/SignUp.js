import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_SIGN_UP_MUTATION = gql`
  mutation DeleteSignUpMutation($id: Int!) {
    deleteSignUp(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const SignUp = ({ signUp }) => {
  const [deleteSignUp] = useMutation(DELETE_SIGN_UP_MUTATION, {
    onCompleted: () => {
      toast.success('SignUp deleted')
      navigate(routes.signUps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete signUp ' + id + '?')) {
      deleteSignUp({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            SignUp {signUp.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{signUp.id}</td>
            </tr>
            <tr>
              <th>Order</th>
              <td>{signUp.order}</td>
            </tr>
            <tr>
              <th>Schedule id</th>
              <td>{signUp.scheduleId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{signUp.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(signUp.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSignUp({ id: signUp.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(signUp.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default SignUp
