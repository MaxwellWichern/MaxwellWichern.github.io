import React from 'react'
import {Link} from 'react-router-dom'
import { updatePasswordByEmail } from '../routeToServer'

export default function PasswordResetPage(props) {
  const form = React.useRef();

  const submitPassword = (e) => {
    console.log(form)
    try {
      if (form.current[1].value === form.current[2].value) {
        updatePasswordByEmail(form.current[0].value, {userPw: form.current[1].value})
      }
      else {throw new Error("Passwords are not equal")}
    }catch (e) {
      console.error(e)
    }
  }

  return(
    <div>
      <h1>Time to reset your password</h1>
      <form style={{display: "block"}} ref={form} onSubmit={submitPassword}>
        <label>Email:</label>
        <input style={{margin: "5px", padding: "5px"}} type="email" />
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
