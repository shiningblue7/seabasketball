import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/AutoCreate/AutoCreatesCell'

const DELETE_AUTO_CREATE_MUTATION = gql`
  mutation DeleteAutoCreateMutation($id: Int!) {
    deleteAutoCreate(id: $id) {
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

const AutoCreatesList = ({ autoCreates }) => {
  const [deleteAutoCreate] = useMutation(DELETE_AUTO_CREATE_MUTATION, {
    onCompleted: () => {
      toast.success('AutoCreate deleted')
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
    if (confirm('Are you sure you want to delete autoCreate ' + id + '?')) {
      deleteAutoCreate({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Enabled</th>
            <th>Scheduled at</th>
            <th>Auto create at</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {autoCreates.map((autoCreate) => (
            <tr key={autoCreate.id}>
              <td>{truncate(autoCreate.id)}</td>
              <td>{checkboxInputTag(autoCreate.enabled)}</td>
              <td>{timeTag(autoCreate.scheduledAt)}</td>
              <td>{timeTag(autoCreate.autoCreateAt)}</td>
              <td>{timeTag(autoCreate.createdAt)}</td>
              <td>{timeTag(autoCreate.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.autoCreate({ id: autoCreate.id })}
                    title={'Show autoCreate ' + autoCreate.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAutoCreate({ id: autoCreate.id })}
                    title={'Edit autoCreate ' + autoCreate.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete autoCreate ' + autoCreate.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(autoCreate.id)}
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

export default AutoCreatesList
