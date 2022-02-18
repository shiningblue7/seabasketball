export const QUERY = gql`
  query FindAutocreateQuery($id: DateTime!) {
    autocreate: autocreate(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ autocreate }) => {
  return <div>{JSON.stringify(autocreate)}</div>
}
