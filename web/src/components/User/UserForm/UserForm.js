import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

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
          name="subject"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Subject
        </Label>
        <TextField
          name="subject"
          defaultValue={props.user?.subject}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="subject" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="roles"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Roles
        </Label>
        <TextField
          name="roles"
          defaultValue={props.user?.roles}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="roles" className="rw-field-error" />

        <Label
          name="member"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Member
        </Label>
        <CheckboxField
          name="member"
          defaultChecked={props.user?.member}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="member" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
