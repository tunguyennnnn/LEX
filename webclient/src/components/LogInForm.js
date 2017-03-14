import React from 'react'
import GoogleLogin from 'react-google-login'
import FaGoogle from 'react-icons/lib/fa/Google'

const responseGoogle = (googleUser) => {
  console.log(googleUser)
  var profile = googleUser.getBasicProfile()
  console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName())
  console.log('Image URL: ' + profile.getImageUrl())
  console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
}

const LogInForm = (props) => {
  return (
    <div class='page-wrap'>
      <GoogleLogin
        clientId='459258257197-ssp9ns8oor4v51djngp82169sqses4qj.apps.googleusercontent.com'
        class='login-button'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}>
        <FaGoogle />
        <span> Login with Google</span>
      </GoogleLogin>
    </div>
  )
}

export default LogInForm
