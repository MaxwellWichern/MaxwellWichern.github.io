import React from 'react'
import {Link} from 'react-router-dom'
import { updatePasswordByEmail, getUserByEmail } from '../routeToServer'
import bcrypt from 'bcryptjs'

//the actual page to reset a password
export default function PasswordResetPage(props) {
  const form = React.useRef();
  const [showForm, setShowForm] = React.useState(false)
  const [message, setMessage] = React.useState("")

  //submit the password to update it, re-encrypting it if valid
  const submitPassword = async (e) => {
    try {
      if (form.current[1].value === form.current[2].value) {
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(form.current[1].value, salt)
        updatePasswordByEmail(form.current[0].value, {userPw: secPass})
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
      else{
        setShowForm(false)
        setMessage("Unable to reset your password, your account is invalid")
      }
    }
    printValid()
  },[])

  //validate that the use is allowed to reset their password by pulling the key from the user
  async function validateReset() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const keyInfo = urlParams.get('key')
    const userEmail = urlParams.get('email')
    let valid = false
    console.log(userEmail)
    const emailResponseVal = await getUserByEmail(userEmail)
    console.log(await emailResponseVal)
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
    <div className="w3-row-padding w3-padding-64 w3-display-container" style={{height:'100%'}}>
      <div className="w3-display-topmiddle">

        {!showForm ? <h1>Please Wait, Processing Request</h1>
        :
        <><h1>Time to reset your password</h1>
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

        <h1>{message}</h1>




        <Link to='/Login' style={{ textDecoration: 'none' }}><input type="submit" value="Return To Login Page" id="returnToLoginButton"/></Link>
      </div>
    </div>
  )
}
