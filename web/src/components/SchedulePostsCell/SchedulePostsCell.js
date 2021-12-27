export const QUERY = gql`
  query SchedulesQuery {
    schedules {
      id
      title
      schedule
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ schedules }) => {
  console.log('schedules ', schedules)
  return (
    <article>
    <h2>{schedules[0].title} - {new Date(schedules[0].schedule).toLocaleString()}</h2>
    </article>
  )
  // return JSON.stringify(schedules)
}

// export const Success = ({ schedulePosts }) => {
//   return JSON.stringify(schedules)
// }
