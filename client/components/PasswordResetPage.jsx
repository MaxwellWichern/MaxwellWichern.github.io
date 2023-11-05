import React from 'react'

export default function PasswordResetPage(props) {

  const form = React.useRef();

  const submitPassword = (e) => {
    console.log(form)
  }

  return(
    <div>
      <h1>Time to reset your password</h1>
      <form style={{display: "block"}} ref={form} onSubmit={submitPassword}>
        <label>Password:</label>
        <input style={{margin: "5px", padding: "5px"}} type="password" />
        <label>Confirm Password:</label>
        <input style={{margin: "5px", padding: "5px"}} type="password"/>
        <input type="submit" value="Send" />
      </form>
      <div style={{visibility:"hidden"}} id="accountNotFoundError">Passwords do not match, please try again</div>
      <Link to='/Login'><input type="submit" value="Return To Login Page" id="returnToLoginButton"/></Link>
    </div>
  )
}
