import AutoCreate from 'src/components/AutoCreate/AutoCreate'

export const QUERY = gql`
  query FindAutoCreateById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>AutoCreate not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ autoCreate }) => {
  return <AutoCreate autoCreate={autoCreate} />
}
