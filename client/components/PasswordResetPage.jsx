import React from 'react'
import {Link} from 'react-router-dom'
import { updatePasswordByEmail, getUserByEmail } from '../routeToServer'

export default function PasswordResetPage(props) {
  const form = React.useRef();
  const [showForm, setShowForm] = React.useState(false)

  const submitPassword = (e) => {
    try {
      if (form.current[1].value === form.current[2].value) {
        updatePasswordByEmail(form.current[0].value, {userPw: form.current[1].value})
      }
      else {throw new Error("Passwords are not equal")}
    }catch (e) {
      console.error(e)
    }
  }

  React.useEffect(()=>{
    async function printValid() {
      if (await validateReset() === true) {
        setShowForm(true)
      }
    }
    printValid()
  },[])

  async function validateReset() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const keyInfo = urlParams.get('key')
    const userEmail = urlParams.get('email')
    let valid = false

    const emailResponseVal = await getUserByEmail(userEmail)

    try {

      if (String(emailResponseVal[0].key) === String(keyInfo)){
        valid = true
      }
    }catch {
      return false
    }
    return valid
  }

  return(
    <div>

      {showForm && <><h1>Time to reset your password</h1>
      <form style={{display: "block"}} ref={form} onSubmit={submitPassword}>
        <label>Email:</label>
        <input style={{margin: "5px", padding: "5px"}} type="email" />
        <label>Password:</label>
        <input style={{margin: "5px", padding: "5px"}} type="password" />
        <label>Confirm Password:</label>
        <input style={{margin: "5px", padding: "5px"}} type="password"/>
        <input type="submit" value="Send" />
      </form>
      <div style={{visibility:"hidden"}} id="accountNotFoundError">Passwords do not match, please try again</div></>}

      {!showForm && <h1>Return To Login Page</h1>}


      <Link to='/Login' style={{ textDecoration: 'none' }}><input type="submit" value="Return To Login Page" id="returnToLoginButton"/></Link>
    </div>
  )
}
