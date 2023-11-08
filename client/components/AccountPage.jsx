import React from 'react'
import { updateUserById } from '../routeToServer.js'
import { CredentialsContext } from './App.jsx'
import ForgotPasswordPage from './ForgotPasswordPage.jsx'


const inputStyle = {
  border: 'solid 1px',
  width: '100%'
}

const pageStyle= {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export default function AccountPage(props) {
  const {uId, uName, uEmail} = React.useContext(CredentialsContext)
  const [updateResult, setUpdateResult] = React.useState("")
  const [showSubmit, setShowSubmit] = React.useState(false)
  const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);

  const onUserChange = (e) => {
    uName[1](e.target.value)
    setShowSubmit(true)
  }

  const onEmailChange = (e) => {
    uEmail[1](e.target.value)
    setShowSubmit(true)
  }

  const onSubmission = async (e) => {
    e.preventDefault()

    let res = await updateUserById(uId[0], {userName: uName[0], email: uEmail[0]})

    if (res === null) {
      res = "Failed to Update With this information, try again..."
    }
    else if (res.success === true) {
      res = "User Information has been updated!"
    }
    console.log(res)
    setUpdateResult(res)
  }

  function requestPassWordChange() {
    setShowForgotPasswordPage(true)
  }

  return(
    <>
      <div style={pageStyle}>

        {updateResult && <h2>{updateResult}</h2>}

        {!showForgotPasswordPage &&
        <>
          <form onSubmit={onSubmission}>
            <h2><input type='text' style={inputStyle} onChange={onUserChange} value={uName[0]}/></h2>
            <h3><input type='text' style={inputStyle} onChange={onEmailChange} value={uEmail[0]}/></h3>
            {showSubmit && <input type='submit' value='Submit'/>}
          </form>

          <input type='button' value='Change Password Request' onClick={requestPassWordChange} />
        </>}

        {showForgotPasswordPage && <ForgotPasswordPage setter1 = {setShowLoginPage} setter2={setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}

      </div>
    </>
  )
}
