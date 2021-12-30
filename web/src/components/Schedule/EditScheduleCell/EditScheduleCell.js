import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import ScheduleForm from 'src/components/Schedule/ScheduleForm'

export const QUERY = gql`
  query EditScheduleById($id: Int!) {
    schedule: schedule(id: $id) {
      id
      title
      date
      createdAt
    }
  }
`
const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateScheduleMutation($id: Int!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
      title
      date
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ schedule }) => {
  const [updateSchedule, { loading, error }] = useMutation(
    UPDATE_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Schedule updated')
        navigate(routes.schedules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateSchedule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Schedule {schedule.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm
          schedule={schedule}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
