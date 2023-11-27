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
  const [tempUserName, setTempUserName] = React.useState(uName[0])
  const [tempEmail, setTempEmail] = React.useState(uEmail[0])

  //const [showLoginPage,setShowLoginPage] = React.useState(true);
  //const [showCreateAccountPage, setShowCreateAccountPage] = React.useState(false);
  const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);
  const [changeInformation, setChangeInformation] = React.useState(false);

  const onUserChange = (e) => {
    setTempUserName(e.target.value)
    if(tempUserName == uName[0] && tempEmail == uEmail[0]){
      setShowSubmit(false)
    }else{
      setShowSubmit(true)
    }
  }

  const onEmailChange = (e) => {
    setTempEmail(e.target.value)
    if(tempUserName == uName[0] && tempEmail == uEmail[0]){
      setShowSubmit(false)
    }else{
      setShowSubmit(true)
    }
  }

  const onSubmission = () => {
    if(tempUserName != uName[0] || tempEmail != uEmail[0]){
      setChangeInformation(true)
    }else{
      setChangeInformation(false)
    }
    //updateById( , {newUserName: username, newEmail: email})
  }

  function requestPassWordChange() {
    setShowForgotPasswordPage(true)
  }

  return(
    <>
      <div style={pageStyle}>

        {!showForgotPasswordPage &&
        changeInformation &&
        <>
          <form onSubmit={onSubmission}>
            <h2><input type='text' style={inputStyle} onChange={onUserChange} value={tempUserName}/></h2>
            <h3><input type='text' style={inputStyle} onChange={onEmailChange} value={tempEmail}/></h3>
            {showSubmit && <input type='submit' value='Submit'/>}
          </form>

          <input type='button' value='Change Password Request' onClick={requestPassWordChange} />
        </>}

        {
          !showForgotPasswordPage &&
          !changeInformation &&
          <>
          <div>
            <h2>My Information</h2>
            <table>
              <tr>
                <td>Username: </td>
                <td>{uName[0]}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{uEmail[0]}</td>
              </tr>
            </table>
            <input type="button" value="Change Account Information" onClick={(e)=>{setChangeInformation(true)}}/>
          </div>
          </>
        }

        {showForgotPasswordPage && <ForgotPasswordPage setter1 = {setShowLoginPage} setter2={setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}

      </div>
    </>
  )
}
