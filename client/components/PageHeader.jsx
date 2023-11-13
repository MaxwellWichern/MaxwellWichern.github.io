import React from 'react'
import PropTypes from 'prop-types'
import { CredentialsContext, PagesContext } from './App.jsx'
import { Outlet, Link } from "react-router-dom";

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

        <Link to='/Collection' style={{ textDecoration: 'none' }}>
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
        </div>
      </Link>}
    </nav>

    </>
  )
}

