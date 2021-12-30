import { Fragment } from "react"
import { FieldError, Label, SelectField } from "@redwoodjs/forms"
export const QUERY = gql`
  query FindScheduleLookupQuery{
    scheduleLookup: schedules {
      id
      title
    }
    users{
      id
      name
    }
  }
`

export const Loading = (props) => <div>Loading...{props.defaultValue && <span>Looking for {props.defaultValue}</span>}</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ scheduleLookup, props, users }) => {
  let scheduleOptions = scheduleLookup.map((schedule)=> {
    return <option value={schedule?.id} key={schedule?.id}>{schedule?.title}</option>
  })
  let usersOptions = users.map((user)=> {
    return <option value={user?.id} key={user?.id}>{user?.name}</option>
  })
  // console.log('props', props)
  // console.log('schedulelookupcell props', defaultValue)

  return (
    <Fragment>
      {/* <code>{JSON.stringify(props)}</code> */}
    <Label
    name="scheduleId"
    className="rw-label"
    errorClassName="rw-label rw-label-error"
  >
    Schedule
    </Label>
  <SelectField name="scheduleId"
      defaultValue={props?.scheduleId}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
      validation={{ required: true }}
      >
      {scheduleOptions}
    </SelectField>
    <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
    <SelectField name="userId"
      defaultValue={props?.userId}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
      validation={{ required: true }}
      >
      {usersOptions}
    </SelectField>
    <FieldError name="scheduleId" className="rw-field-error" />
    </Fragment>
)
}
