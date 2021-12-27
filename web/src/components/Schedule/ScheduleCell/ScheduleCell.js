import Schedule from 'src/components/Schedule/Schedule'

export const QUERY = gql`
  query FindScheduleById($id: Int!) {
    schedule: schedule(id: $id) {
      id
      title
      schedule
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Schedule not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ schedule }) => {
  return <Schedule schedule={schedule} />
}
