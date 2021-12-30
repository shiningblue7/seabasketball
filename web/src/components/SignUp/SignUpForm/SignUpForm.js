import { useMutation } from '@redwoodjs/web'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
  SelectField
} from '@redwoodjs/forms'
import ScheduleLookupCell from 'src/components/ScheduleLookupCell'


// console.log('ScheduleLookupCell ', ScheduleLookupCell)
const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const SignUpForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.signUp?.id)
  }

  return (
    <div className="rw-form-wrapper">

    {/* {schedules.map((schedule) => (
      <ul>
              <li>{schedule.id}</li>
              <li>{schedule.title}</li>
              </ul>
              ))} */}
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="order"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order
        </Label>
        <NumberField
          name="order"
          defaultValue={props.signUp?.order}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="order" className="rw-field-error" />
        {/* <ScheduleLookupCell defaultValue={props.signUp?.scheduleId} /> */}
        <ScheduleLookupCell props={props?.signUp} />

{/*}
        <Label
          name="scheduleId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Schedule id
        </Label>
        <NumberField
          name="scheduleId"
          defaultValue={props.signUp?.scheduleId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="scheduleId" className="rw-field-error" />
            */}

        {/* <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <NumberField
          name="userId"
          defaultValue={props.signUp?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm
