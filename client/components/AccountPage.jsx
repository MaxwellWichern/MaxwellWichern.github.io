import React from 'react'
import { updateById } from '../routeToServer'


const inputStyle = {
  border: 'none'
}

const pageStyle= {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export default function AccountPage(props) {

  const [username, setUsername] = React.useState('No UserName')
  const [email, setEmail] = React.useState('No Email')
  const [showSubmit, setShowSubmit] = React.useState(false)
  const [noPasswordModal, setNoPasswordModal] = React.useState(null)

  const onUserChange = (e) => {
    setUsername(e.target.value)
    setShowSubmit(true)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setShowSubmit(true)
  }

  const onSubmission = () => {
    //updateById( , {newUserName: username, newEmail: email})
  }

  function requestPassWordChange() {
    //
  }

  return(
    <>
      <EmailModal open={noPasswordModal} onClose={setNoPasswordModal}/>
      <div style={pageStyle}>

        <form onSubmit={onSubmission}>
          <h2><input type='text' style={inputStyle} onChange={onUserChange} value={username}/></h2>
          <input type='text' style={inputStyle} onChange={onEmailChange} value={email}/>
          {showSubmit && <input type='submit' value='Submit'/>}
        </form>

        <input type='button' value='Change Password Request' onClick={requestPassWordChange} />

      </div>
    </>
  )
}
