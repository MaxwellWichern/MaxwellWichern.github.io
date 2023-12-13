import React from 'react'
import { updateUserById } from '../routeToServer.js'
import { CredentialsContext, FLASK_URL } from './App.jsx'
import ForgotPasswordPage from './ForgotPasswordPage.jsx'
import { Link } from 'react-router-dom'
import { deleteByName } from '../routeToServer.js'
import { useNavigate } from 'react-router-dom'


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
  const {uId, uName, uEmail, loggedIn} = React.useContext(CredentialsContext)
  const [updateResult, setUpdateResult] = React.useState("")
  const [showSubmit, setShowSubmit] = React.useState(false)
  const [tempUserName, setTempUserName] = React.useState(uName[0])
  const [tempEmail, setTempEmail] = React.useState(uEmail[0])

  const [showLoginPage,setShowLoginPage] = React.useState(true);
  const [showCreateAccountPage, setShowCreateAccountPage] = React.useState(false);
  const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);
  const [changeInformation, setChangeInformation] = React.useState(false);

  let navigate = useNavigate()

  React.useEffect(()=>{
    if(!loggedIn[0]){
      navigate('/Login')
    }
  }, [])

  function onUserChange(e) {
    var curText = e.target.value
    setTempUserName(curText)
    if(curText == uName[0] && tempEmail == uEmail[0]){
      setShowSubmit(false)
    }else{
      setShowSubmit(true)
    }
  }

  const onEmailChange = (e) => {
    var curText = e.target.value
    setTempEmail(curText)
    if(tempUserName == uName[0] && curText == uEmail[0]){
      setShowSubmit(false)
    }else{
      setShowSubmit(true)
    }
  }

  const onSubmission = async (e) => {
    if(tempUserName != uName[0] || tempEmail != uEmail[0]){
      setChangeInformation(true)
    }else{
      setChangeInformation(false)
    }
    e.preventDefault()

    //either here or in the routing.js or routeToServer, I would suggest inside those functions,
    //we need to request the change of the user image files stored on aws. If its successful or not, we can send back data about the result
    let res = await updateUserById(uId[0], {userName: tempUserName, email: tempEmail})
    uName[1](tempUserName)
    uEmail[1](tempEmail)
    if (res === null) {
      res = "Failed to Update With this information, try again..."
    }
    else if (res.success === true) {
      res = "User Information has been updated!"
    }
    setUpdateResult(res)
  }

  const logOutUser = () => {
    uId[1]("")
    uName[1]("")
    uEmail[1]("")
    loggedIn[1](false)
  }

  function requestPassWordChange() {
    setChangeInformation(false)
    setShowForgotPasswordPage(true)
  }

  const promptDeleteAccount = () => {
    areYouSure = document.getElementById("AreYouSure")
    deleteButton = document.getElementById("ConfirmDelete")
    dontDeleteButton = document.getElementById("ConfirmNotDelete")
    areYouSure.style.visibility = 'visible'
    deleteButton.style.visibility = 'visible'
    dontDeleteButton.style.visibility = 'visible'
  }

  const deleteAccount = async () => {
    const res = deleteByName(uName[0])
    logOutUser()
    const dataString = `${uName[0]}`
    let result = new FormData();
    result.append(
      'Bucket',
      'stegosaurus'
    )
    result.append(
      'Key',
      dataString
    )
    requestOptions = {
      method: 'POST',
      body: result
    }
    const post_result = await fetch(FLASK_URL + 'user/delete/user/', requestOptions)
    .then((response)=>(response.json()))

    navigate('/Login')
  }

  const dontDelete = () => {
    areYouSure = document.getElementById("AreYouSure")
    deleteButton = document.getElementById("ConfirmDelete")
    dontDeleteButton = document.getElementById("ConfirmNotDelete")
    areYouSure.style.visibility = 'hidden'
    deleteButton.style.visibility = 'hidden'
    dontDeleteButton.style.visibility = 'hidden'
  }

  return(
    <>
      <div style={pageStyle}>

        {!showForgotPasswordPage &&
        changeInformation &&
        <>
          <form onSubmit={onSubmission}>
            <h2><input type='text' style={inputStyle} onChange={(e)=>{onUserChange(e)}} value={tempUserName}/></h2>
            <h2><input type='text' style={inputStyle} onChange={onEmailChange} value={tempEmail}/></h2>
            {showSubmit && <input type='submit' value='Submit'/>}
          </form>

          <div>
            <input type='button' value='Change Password Request' onClick={requestPassWordChange} />
            <input type='button' value='Cancel' onClick={(e)=>{setChangeInformation(false)}}/>
          </div>
          <div>
            <input type='button' value='Delete Account' onClick={promptDeleteAccount}/>
            <Link to="/Login"> <input type='button' value='Log Out' onClick={logOutUser}/> </Link>
          </div>
          <div>
            <div><h3 style={{visibility:'hidden'}} id='AreYouSure'>Are You Sure?</h3></div>
            <div>
              <input type='button' value='Yes, Delete My Account' style={{visibility:'hidden'}} id='ConfirmDelete' onClick={deleteAccount}/>
              <input type='button' value="No, Don't Delete My Account" style={{visibility:'hidden'}} id='ConfirmNotDelete' onClick={dontDelete}/>
            </div>
          </div>

        </>}

        {
          !showForgotPasswordPage &&
          !changeInformation &&
          <>
          <div>
            <h2>My Information</h2>
            <table>
              <tbody>
                <tr>
                  <td>Username: </td>
                  <td>{uName[0]}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Email: </td>
                  <td>{uEmail[0]}</td>
                </tr>
              </tbody>
            </table>
            <input type="button" value="Change Account Information" onClick={(e)=>{setChangeInformation(true)}}/>
            <Link to="/Login"> <input type='button' value='Log Out' onClick={logOutUser}/> </Link>
            <h2>{updateResult}</h2>
          </div>
          </>
        }

        {//updateResult && <h2>{updateResult}</h2>}
        }

        {showForgotPasswordPage && <ForgotPasswordPage setter1 = {setShowLoginPage} setter2={setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}

      </div>
    </>
  )
}
