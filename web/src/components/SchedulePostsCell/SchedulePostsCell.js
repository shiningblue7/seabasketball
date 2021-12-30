export const QUERY = gql`
  query SchedulesQuery {
    schedules {
      id
      title
      date
    }
    signUps{
      id
      createdAt
      user {
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ schedules, signUps }) => {
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
    var locale = new Date(datetime).toLocaleString("en-US", {timeZone: "GMT"})
    return (

      <time dateTime={locale} title={locale}>
        {locale}
      </time>
    )
  }

  return (
    <>
    <article>
    <h2>{schedules[0].title} - {new Date(schedules[0].date).toLocaleString()}</h2>
    </article>

    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Signed Up</th>
            <th>Signed Up at</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {signUps.map((signup) => (
            <tr key={signup.id}>
              <td>{truncate(signup.user.name)}</td>
              <td>{timeTag(signup.createdAt)}</td>
              {/* <td>
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
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
  // return JSON.stringify(schedules)
}

// export const Success = ({ schedulePosts }) => {
//   return JSON.stringify(schedules)
// }
