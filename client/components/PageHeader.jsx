import React from 'react'
import PropTypes from 'prop-types'
import { CredentialsContext, PagesContext } from './App.jsx'

const headerStyle = {
  background: '#A82104',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const tabStyle = {
  padding: '30px',
  cursor: 'pointer',
  fontSize: '20px',
}

const accountTabStyle = {
  marginRight: '5%',
  padding: '30px',
  cursor: 'pointer',
  fontSize: '20px',
}

export default function PageHeader(props) {
  const { title } = props
  const {value1, value2, value3, value4, value5, value6, value7} = React.useContext(PagesContext)
  const {uName, uPassword, uEmail, loggedIn} = React.useContext(CredentialsContext)


  const [instructionsPage, setInstructionsPage] = value1
  const [encoderPage, setEncoderPage] = value2
  const [decoderPage, setDecoderPage] = value3
  const [dataCollectionPage, setDataCollectionPage] = value4
  const [aboutPage, setAboutPage] = value5
  const [accountPage, setAccountPage] = value6
  const [loginPage, setLoginPage] = value7

  function falsifyPages() {
    setInstructionsPage(false)
    setEncoderPage(false)
    setDecoderPage(false)
    setDataCollectionPage(false)
    setAboutPage(false)
    setAccountPage(false)
    setLoginPage(false)
  }

  function mouseEntered(e) {
    e.target.style.background = '#8D1B03'
    e.target.style.color = 'white'
  }

  function mouseLeft(e) {
    e.target.style.background = '#A82104'
    e.target.style.color = 'black'
  }

  return (
    <div style={headerStyle}>
      <div style={{ margin: '5px', color: 'white', cursor: 'pointer', fontSize: '50px' }}
      onClick={() => {
        falsifyPages()
        setAboutPage(true)
        }}>{title}
      </div>

      <div style={{display: 'flex'}}>
        <div style={tabStyle}
        onMouseEnter={(e)=>{mouseEntered(e)}}
        onMouseLeave={(e)=>{mouseLeft(e)}}
        onClick={() => {
          falsifyPages()
          setInstructionsPage(true)
        }}>Instructions
        </div>
        <div style={tabStyle}
        onMouseEnter={(e)=>{mouseEntered(e)}}
        onMouseLeave={(e)=>{mouseLeft(e)}}
        onClick={() => {
          falsifyPages()
          setEncoderPage(true)
        }}>Encoder
        </div>
        <div style={tabStyle}
        onMouseEnter={(e)=>{mouseEntered(e)}}
        onMouseLeave={(e)=>{mouseLeft(e)}}
        onClick={() => {
          falsifyPages()
          setDecoderPage(true)
        }}>Decoder
        </div>
        <div style={tabStyle}
        onMouseEnter={(e)=>{mouseEntered(e)}}
        onMouseLeave={(e)=>{mouseLeft(e)}}
        onClick={() => {
          falsifyPages()
          setDataCollectionPage(true)
        }}>Collections
        </div>
      </div>
      {loggedIn[0] &&
      <div style={accountTabStyle}
      onMouseEnter={(e)=>{mouseEntered(e)}}
      onMouseLeave={(e)=>{mouseLeft(e)}}
      onClick={() => {
        falsifyPages()
        setAccountPage(true)
      }}>Account
      </div>}

      {!loggedIn[0] && <div style={tabStyle}
        onMouseEnter={(e)=>{mouseEntered(e)}}
        onMouseLeave={(e)=>{mouseLeft(e)}}
        onClick={() => {
          falsifyPages()
          setLoginPage(true)
        }}>Login
        </div>}

    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Page Title',
  subTitle: 'Page Subtitle'
}
