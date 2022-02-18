import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_AUTO_CREATE_MUTATION = gql`
  mutation DeleteAutoCreateMutation($id: Int!) {
    deleteAutoCreate(id: $id) {
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

const AutoCreate = ({ autoCreate }) => {
  const [deleteAutoCreate] = useMutation(DELETE_AUTO_CREATE_MUTATION, {
    onCompleted: () => {
      toast.success('AutoCreate deleted')
      navigate(routes.autoCreates())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete autoCreate ' + id + '?')) {
      deleteAutoCreate({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            AutoCreate {autoCreate.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{autoCreate.id}</td>
            </tr>
            <tr>
              <th>Enabled</th>
              <td>{checkboxInputTag(autoCreate.enabled)}</td>
            </tr>
            <tr>
              <th>Scheduled at</th>
              <td>{timeTag(autoCreate.scheduledAt)}</td>
            </tr>
            <tr>
              <th>Auto create at</th>
              <td>{timeTag(autoCreate.autoCreateAt)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(autoCreate.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(autoCreate.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAutoCreate({ id: autoCreate.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(autoCreate.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default AutoCreate
