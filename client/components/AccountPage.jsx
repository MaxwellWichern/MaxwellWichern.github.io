import React from 'react'

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
  const {uName, uPassword, uEmail, loggedIn} = React.useContext(CredentialsContext)

  const [showSubmit, setShowSubmit] = React.useState(false)

  //const [showLoginPage,setShowLoginPage] = React.useState(true);
  //const [showCreateAccountPage, setShowCreateAccountPage] = React.useState(false);
  const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);

  const onUserChange = (e) => {
    uName[1](e.target.value)
    setShowSubmit(true)
  }

  const onEmailChange = (e) => {
    uEmail[1](e.target.value)
    setShowSubmit(true)
  }

  const onSubmission = () => {
    //updateById( , {newUserName: username, newEmail: email})
  }

  function requestPassWordChange() {
    setShowForgotPasswordPage(true)
  }

  return(
    <>
      <div style={pageStyle}>

        {!showForgotPasswordPage && <><form onSubmit={onSubmission}>
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
