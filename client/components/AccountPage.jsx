import React from 'react'

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

  const onUserChange = (e) => {
    setUsername(e.target.value)
    setShowSubmit(true)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setShowSubmit(true)
  }

  const onSubmission = () => {
    //send data to database
  }

  function requestPassWordChange() {
    // send an email
  }
  return(
    <div style={pageStyle}>

      <form onSubmit={onSubmission}>
        <h2><input type='text' style={inputStyle} onChange={onUserChange} value={username}/></h2>
        <input type='text' style={inputStyle} onChange={onEmailChange} value={email}/>
        {showSubmit && <input type='submit' value='Submit'/>}
      </form>

      <input type='button' value='Change Password Request' onClick={requestPassWordChange} />

    </div>
  )
}
