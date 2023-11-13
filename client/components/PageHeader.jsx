import React from 'react'
import PropTypes from 'prop-types'
import { CredentialsContext, PagesContext } from './App.jsx'
import { Outlet, Link } from "react-router-dom";

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
  const {uName, uPassword, uEmail, loggedIn} = React.useContext(CredentialsContext)

  function mouseEntered(e) {
    e.target.style.background = '#8D1B03'
    e.target.style.color = 'white'
  }

  function mouseLeft(e) {
    e.target.style.background = '#A82104'
    e.target.style.color = 'black'
  }

  return (
    <>
    <nav style={headerStyle}>

      <Link to='/' style={{ textDecoration: 'none' }}>
        <div style={{ margin: '5px', color: 'white', cursor: 'pointer', fontSize: '50px' }}

          >{title}
        </div>
      </Link>


      <div style={{display: 'flex'}}>

        <Link to='/Instructions' style={{ textDecoration: 'none' }}>
          <div style={tabStyle}
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}

            >Instructions
          </div>
        </Link>

        <Link to='/Encoding' style={{ textDecoration: 'none' }}>
          <div style={tabStyle}
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}

            >Encoder
          </div>
        </Link>

        <Link to='/Decoding' style={{ textDecoration: 'none' }}>
          <div style={tabStyle}
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}

            >Decoder
          </div>
        </Link>

        <Link to='/Collections' style={{ textDecoration: 'none' }}>
          <div style={tabStyle}
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}
            >Collections
          </div>
        </Link>
      </div>




      {loggedIn[0] &&
        <Link to='/Account' style={{ textDecoration: 'none' }}>
          <div style={accountTabStyle}
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}

            >Account
          </div>
        </Link>
      }

      {!loggedIn[0] &&
      <Link to='/Login' style={{ textDecoration: 'none' }}>
        <div style={accountTabStyle}
          onMouseEnter={(e)=>{mouseEntered(e)}}
          onMouseLeave={(e)=>{mouseLeft(e)}}

          >Login
        </div>
      </Link>}
    </nav>

    <Outlet />
    </>
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
