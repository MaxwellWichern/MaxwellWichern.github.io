import React from 'react'

export default function PasswordResetPage(props) {
  const {setter1, setter2, setter3} = props;

  const form = React.useRef();

  const returnToLogin = (e) => {
    setter1(true)
    setter2(false)
    setter3(false)
  }

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
            <div><input type="submit" value="Return To Login Page" onClick={returnToLogin} id="returnToLoginButton"/></div>
    </div>
  )
}
