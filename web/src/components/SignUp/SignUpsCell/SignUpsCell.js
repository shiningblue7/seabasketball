import { Link, routes } from '@redwoodjs/router'

import SignUps from 'src/components/SignUp/SignUps'

export const QUERY = gql`
  query FindSignUps {
    signUps {
      id
      order
      scheduleId
      userId
      createdAt
    }
    users {
      id
      name
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No signUps yet. '}
      <Link to={routes.newSignUp()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ signUps, users }) => {
  //  console.log(' signUps', signUps)
  // console.log(' schedules', schedules)
  // console.log(' users', users)
  return <SignUps signUps={signUps} users={users} />
}
