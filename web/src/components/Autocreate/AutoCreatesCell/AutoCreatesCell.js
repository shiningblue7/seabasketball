import { Link, routes } from '@redwoodjs/router'

import AutoCreates from 'src/components/AutoCreate/AutoCreates'

export const QUERY = gql`
  query FindAutoCreates {
    autoCreates {
      id
      enabled
      scheduledAt
      autoCreateAt
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No autoCreates yet. '}
      <Link to={routes.newAutoCreate()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ autoCreates }) => {
  return <AutoCreates autoCreates={autoCreates} />
}
