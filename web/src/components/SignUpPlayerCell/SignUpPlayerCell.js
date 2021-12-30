export const QUERY = gql`
  query FindScheduleQuery{
    schedule: activeSchedule{
      id
      title
      date
      createdAt
    }
    signUps: activeSignups{
      id
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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ schedule, signUps, players }) => {
  var userGoodList = [];
  for (var j = 0; signUps.length > j;j++) {
      var signUpUser = signUps[j];
      userGoodList = users.filter(x => {
        return x.id != signUpUser.user.id;
      })
  }

  const [createSignUp, { loading, error }] = useMutation(
    CREATE_SIGN_UP_MUTATION,
    {
      onCompleted: () => {
        toast.success('SignUp created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      scheduleId: parseInt(input.scheduleId),
      userId: parseInt(input.userId),
    })
    createSignUp({ variables: { input: castInput } })
  }

  const DELETE_SIGNUP_MUTATION = gql`
  mutation deleteSignUpMutation($id: Int!) {
    deleteSignUp(id: $id) {
      id
    }
  }
  `
  const [deleteSignUp] = useMutation(DELETE_SIGNUP_MUTATION, {
    onCompleted: () => {
      toast.success('Sign Up deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id,name) => {
    if (confirm('Are you sure you want to remove ' + name + '?')) {
      deleteSignUp({ variables: { id } })
    }
  }

  function sayHello(name) {
    // alert(`hello, ${name}`);
    console.log('props', name.target.options)
  }
  const [players, setPlayers] = useState([])
  const printPlayers= (data) => {
    var newPlayers = []
    console.log(' data' , data)
    for (var key in data) {
      // console.log('key ' + key)
      // console.log('value ' + data[key])
      if (data[key].value) {
        console.log('data key value ' + data[key].value)
        newPlayers.push(data[key].value)
      }
    }
    setPlayers(newPlayers)
    return
  }

  const MAX_STRING_LENGTH = 150
  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  const jsonTruncate = (obj) => {
    return truncate(JSON.stringify(obj, null, 2))
  }

  const timeTag = (datetime) => {
    var locale = new Date(datetime).toLocaleString("en-US", {timeZone: "GMT"})
    return (

      <time dateTime={locale} title={locale}>
        {locale}
      </time>
    )
  }

  let count = 1
  return (
    <>
    <article>
    <h2>{schedule.title} - {new Date(schedule.date).toLocaleString()}</h2>
    </article>

    <div>
      <p>players: {players}</p>
      <h2> Signed Up Players</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Signed Up</th>
            <th>Order</th>
            <th>Remove</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {signUps.map((signup, count) => (
            <tr key={signup.id}>
              <td>{truncate(signup.user.name)}</td>
              <td>{++count}</td>
              <td><button
                    type="button"
                    title={'Remove signup' + signup.user.name}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(signup.id, signup.user.name)}
                  >
                    Remove
                  </button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2> Players</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Add</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td><button
                    type="button"
                    title={'Add to signup' + user.name}
                    className="rw-button rw-button-small rw-button-green"
                    onClick={() => onAddClick(user.id)}
                  >
                    Add
                  </button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </>
  )

}
