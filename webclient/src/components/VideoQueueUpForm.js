import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const validate = values => {
  const errors = {}
  // const requiredFields = ['youtubeurl']
  // requiredFields.forEach(field => {
  //   if (!values[ field ]) {
  //     errors[ field ] = 'Required'
  //   }
  // })
  // <RaisedButton label='Queue up!' disabled={pristine || submitting} type='submit' secondary />
  return errors
}

const renderField = ({input, label, type, meta: {touched, error}, ...custom}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const VideoQueueUpForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='youtubeurl' type='url' component={renderField} label='Youtube url' />
      </div>
      <div>
        <RaisedButton label='Queue up!' disabled={pristine} type='submit' secondary />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'videoQueueUp',
  validate
})(VideoQueueUpForm)
