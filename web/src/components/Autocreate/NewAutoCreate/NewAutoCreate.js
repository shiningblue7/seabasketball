import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import AutoCreateForm from 'src/components/AutoCreate/AutoCreateForm'

const CREATE_AUTO_CREATE_MUTATION = gql`
  mutation CreateAutoCreateMutation($input: CreateAutoCreateInput!) {
    createAutoCreate(input: $input) {
      id
    }
  }
`

const NewAutoCreate = () => {
  const [createAutoCreate, { loading, error }] = useMutation(
    CREATE_AUTO_CREATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('AutoCreate created')
        navigate(routes.autoCreates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createAutoCreate({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New AutoCreate</h2>
      </header>
      <div className="rw-segment-main">
        <AutoCreateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAutoCreate
