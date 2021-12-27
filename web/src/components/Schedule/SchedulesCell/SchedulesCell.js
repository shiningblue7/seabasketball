import { Link, routes } from '@redwoodjs/router'

import Schedules from 'src/components/Schedule/Schedules'

export const QUERY = gql`
  query FindSchedules {
    schedules {
      id
      title
      schedule
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No schedules yet. '}
      <Link to={routes.newSchedule()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ schedules }) => {
  return <Schedules schedules={schedules} />
}
