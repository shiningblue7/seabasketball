import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Schedule/SchedulesCell'

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: Int!) {
    deleteSchedule(id: $id) {
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

const SchedulesList = ({ schedules }) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('Schedule deleted')
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
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Schedule</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{truncate(schedule.id)}</td>
              <td>{truncate(schedule.title)}</td>
              <td>{timeTag(schedule.schedule)}</td>
              <td>{timeTag(schedule.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.schedule({ id: schedule.id })}
                    title={'Show schedule ' + schedule.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSchedule({ id: schedule.id })}
                    title={'Edit schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(schedule.id)}
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

export default SchedulesList
