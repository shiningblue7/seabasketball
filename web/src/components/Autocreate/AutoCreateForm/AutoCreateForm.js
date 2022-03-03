import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TimeField,
  SelectField,
  Submit,
  CheckboxField,
} from '@redwoodjs/forms'
import { useState } from 'react'
const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const formatTime = (value) => {
  if (value) {
    let localDate = new Date(value);
    let hour = localDate.getUTCHours();
    let min = localDate.getMinutes();
    let final = hour + ":" + min
    return final
  }
}

const formatTimeForField = (value) => {
  if (value) {
    let localDate = new Date(value);
    let hours = localDate.getUTCHours();
    // var ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12;
    let min = localDate.getMinutes();
    min = min < 10 ? '0'+min : min;
    let final = hours + ":" + min
    // console.log("time field", final)
    return final
  }
}
const dayOfTime = (value) => {
  if (value) {
    let localDate = new Date(value);
    let final = localDate.getDay()
    return final
  }
}

const AutoCreateForm = (props) => {
  const onSubmit = (data) => {
    console.log('initial data' , data)
    //props.onSave(data, props?.autoCreate?.id)
    //always save time to 1970 January 4
    let saveDate = new Date('Jan 4, 1970 00:00:00');
    console.log("initial saveDate", saveDate)
    let dayOf = parseInt(data.dayOf);
    let arrTime = data.timeOf.split(/:/);

    let hour = arrTime[0]
    let min = arrTime[1]
    saveDate.setUTCHours(hour,min,0)
    // console.log("nextWeekDayOfWeek", nextWeekDayOfWeek)
    // console.log("hour", hour)
    // console.log("min", min)
    saveDate.setDate(saveDate.getDate() + dayOf )
    console.log("saveDate", saveDate)
    saveDate.toISOString()
    data.scheduledAt = saveDate
    delete(data.dayOf)
    delete(data.timeOf)
    delete(data.autoCreateAt)
    console.log("data", data)
    props.onSave(data, props?.autoCreate?.id)

  }
  const [timeOf, setTimeOf] = useState(formatTimeForField(props.autoCreate?.scheduledAt))

  let handleTimeOf = (evt) => {
    setTimeOf(evt.target.value)
    setNextCreate(getNextWeek(new Date(),  new Date(props.autoCreate?.autoCreateAt).getDay(), evt.target.value))
  }
  const [dayOf, setDayOf] = useState(new Date(props.autoCreate?.scheduledAt).getDay())
  let handleDayOf= (evt) => {
    setDayOf(evt.target.value)
    setNextCreate(getNextWeek(new Date(),  parseInt(evt.target.value), formatTime(props.autoCreate?.scheduledAt)))
  }
  const [nextCreate, setNextCreate] = useState(getNextWeek(new Date(), new Date(props.autoCreate?.scheduledAt).getDay(), formatTime(props.autoCreate?.scheduledAt)))

  let dayOfObj = [
    {id: 0, dayText: "Sunday"},
    {id: 1, dayText: "Monday"},
    {id: 2, dayText: "Tuesday"},
    {id: 3, dayText: "Wednesday"},
    {id: 4, dayText: "Thursday"},
    {id: 5, dayText: "Friday"},
    {id: 6, dayText: "Saturday"}
  ]

  let dayOfSelect = dayOfObj.map((day)=> {
    return <option value={day.id} key={day.id}>{day.dayText}</option>
  })
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="enabled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Enabled
        </Label>
        <CheckboxField
          name="enabled"
          defaultChecked={props.autoCreate?.enabled}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <Label
          name="scheduledAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Auto Create Every Week On
        </Label>
        <SelectField
          name="dayOf"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={dayOf}
          select={dayOf}
          onChange={evt => handleDayOf(evt)}
          >
          {dayOfSelect}
        </SelectField>

        <TimeField
          name="timeOf"
          value={timeOf}
          onChange={handleTimeOf}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="scheduledAt" className="rw-field-error" />
        <br /><br />
        <Label
          name="autoCreateAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Next Schedule date will be on
        </Label>
        <DatetimeLocalField
          name="autoCreateAt"
          value={nextCreate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}></DatetimeLocalField>

        <br/><Label>Automation will create this schedule this Sunday at <font color="red">{getThisSunday()}</font></Label>

        <FieldError name="autoCreateAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}


function getNextWeek(date, dayOfWeek, hoursMin) {
	//first add + 7
	let nextWeek = new Date()
	nextWeek.setDate(date.getDate() + 7)
	// console.log('initial nextWeek', nextWeek)
	//determine the dayOfWeek
	let nextWeekDayOfWeek = nextWeek.getDay()

	//next week is sunday  ==> 0
	//I want monday  ==> 1
	//then just + 1

	//next week is tuesday  ==> 2
	//I want monday  ==> 1
	//then just -1

	//get the difference
	let diff = dayOfWeek - nextWeekDayOfWeek
	// console.log('diff', diff)

	//subtract the Day of week  from next week
	nextWeek.setDate(nextWeek.getDate() + diff )
  let arrHoursMin = hoursMin.split(':')
  let hours = parseInt(arrHoursMin[0])
  let mins  = parseInt(arrHoursMin[1])
  // console.log(' new hours ', hours)
  // console.log(' new minutes ', mins)
  // nextWeek.setUTCHours(parseInt(scheduledSource.getHours()),parseInt(scheduledSource.getMinutes()),0)
  nextWeek.setUTCHours(hours,mins,0)
  // nextWeek.setMinutes('0')
	// console.log('nextWeek', nextWeek)
    //let convert = nextWeek.getUTCMonth() + 1 + '/' + nextWeek.getUTCDate() + '/' + nextWeek.getUTCFullYear() + ' ' + nextWeek.getHours() + ':' + nextWeek.getMinutes() + ' ' + ampm
  // console.log('convert ', convert)
  let convert = nextWeek.toISOString()

  return formatDatetime(convert);
}

function getThisSunday() {
	//first add + 7
	let today = new Date()
	let dayOfWeek = today.getDay()
	//Today is Friday  ==> 5
	//then just + 2 which will be to become sunday

	//Today tuesday  ==> 2
	//the just +2  ==> 7
  // x + y = 7
  // y = 7 -x
	//get the difference
	let diff = 7 - dayOfWeek
	// console.log('diff', diff)

	//subtract the Day of week  from next week
	today.setDate(today.getDate() + diff )
   // console.log(' new hours ', hours)
  // console.log(' new minutes ', mins)
  // nextWeek.setUTCHours(parseInt(scheduledSource.getHours()),parseInt(scheduledSource.getMinutes()),0)
  today.setUTCHours(0,15,0)
  // nextWeek.setMinutes('0')
	// console.log('nextWeek', nextWeek)
    //let convert = nextWeek.getUTCMonth() + 1 + '/' + nextWeek.getUTCDate() + '/' + nextWeek.getUTCFullYear() + ' ' + nextWeek.getHours() + ':' + nextWeek.getMinutes() + ' ' + ampm
  // console.log('convert ', convert)
  // let convert = today.toISOString()
    let hours = today.getUTCHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let min = today.getMinutes();
    min = min < 10 ? '0'+min : min;
    let convert = today.getUTCMonth() + 1 + '/' + today.getUTCDate() + '/' + today.getUTCFullYear() + ' ' + hours + ':' + min + ' ' + ampm
  return convert;
}

export default AutoCreateForm
