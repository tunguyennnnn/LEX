import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import GoogleLogin from 'react-google-login'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Your email address is invalid'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Your password must be at least 6 characters long'
  } else if (values.password === values.username) {
    errors.password = 'Your password must be different from your name'
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Your password must contain at least one number (0-9)'
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'Your password must contain at least one lowercase letter (a-z)'
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Your password must contain at least one uppercase letter (A-Z)'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Your passwords do not match'
  }
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

const responseGoogle = (googleUser) => {
  var profile = googleUser.getBasicProfile()
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

const SignUpForm = (props) => {
  const { handleSubmit, submitting } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name='email' type='email' component={renderField} label='Email' />
        </div>
        <div>
          <Field name='firstName' type='text' component={renderField} label='First Name' />
        </div>
        <div>
          <Field name='lastName' type='text' component={renderField} label='Last Name' />
        </div>
        <div>
          <Field name='password' type='password' component={renderField} label='Password' />
        </div>
        <div>
          <Field name='confirmPassword' type='password' component={renderField} label='Confirm Password' />
        </div>
        <div>
          <RaisedButton label='Submit' disabled={submitting} primary type='submit' />
        </div>
      </form>
      <GoogleLogin
        clientId='459258257197-ssp9ns8oor4v51djngp82169sqses4qj.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  )
}

export default reduxForm({
  form: 'signup',  // a unique identifier for this form
  validate        // <--- validation function given to redux-form
})(SignUpForm)
