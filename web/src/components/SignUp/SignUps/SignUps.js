import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/SignUp/SignUpsCell'

const DELETE_SIGN_UP_MUTATION = gql`
  mutation DeleteSignUpMutation($id: Int!) {
    deleteSignUp(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const SignUpsList = ({ signUps }) => {
  const [deleteSignUp] = useMutation(DELETE_SIGN_UP_MUTATION, {
    onCompleted: () => {
      toast.success('SignUp deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete signUp ' + id + '?')) {
      deleteSignUp({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Schedule id</th>
            <th>User id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {signUps.map((signUp) => (
            <tr key={signUp.id}>
              <td>{truncate(signUp.id)}</td>
              <td>{truncate(signUp.scheduleId)}</td>
              <td>{truncate(signUp.userId)}</td>
              <td>{timeTag(signUp.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.signUp({ id: signUp.id })}
                    title={'Show signUp ' + signUp.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSignUp({ id: signUp.id })}
                    title={'Edit signUp ' + signUp.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete signUp ' + signUp.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(signUp.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SignUpsList
