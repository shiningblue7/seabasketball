import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import AutoCreateForm from 'src/components/AutoCreate/AutoCreateForm'

export const QUERY = gql`
  query EditAutoCreateById($id: Int!) {
    autoCreate: autoCreate(id: $id) {
      id
      enabled
      scheduledAt
      autoCreateAt
      createdAt
      updatedAt
    }
  }
`
const UPDATE_AUTO_CREATE_MUTATION = gql`
  mutation UpdateAutoCreateMutation($id: Int!, $input: UpdateAutoCreateInput!) {
    updateAutoCreate(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ autoCreate }) => {
  const [updateAutoCreate, { loading, error }] = useMutation(
    UPDATE_AUTO_CREATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('AutoCreate updated')
        navigate(routes.autoCreates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateAutoCreate({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit AutoCreate {autoCreate.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AutoCreateForm
          autoCreate={autoCreate}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
