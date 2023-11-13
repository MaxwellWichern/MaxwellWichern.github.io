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
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-red.css"></link>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Montserrat"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
    <style
    dangerouslySetInnerHTML={{
      __html:
        '\nbody,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}\n.w3-bar,h1,button {font-family: "Montserrat", sans-serif}\n.fa-anchor,.fa-coffee {font-size:200px}\n'
    }}
  />
{/* Navbar */}
<div className="w3-top">
    <div className="w3-bar w3-red w3-card w3-left-align w3-large">
      <a
        className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red"
        href="javascript:void(0);"
        onclick="myFunction()"
        title="Toggle Navigation Menu"
      >
        <i className="fa fa-bars" />
      </a>
      <a href="/" className="w3-bar-item w3-button w3-padding-large w3-hover-white">
        Home
      </a>
      <a
        href="instructions"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Instructions
      </a>
      <a
        href="encoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Encoder
      </a>
      <a
        href="decoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Decoder
      </a>
      <a
        href="collections"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Collections
      </a>
      {!loggedIn[0] &&
      <Link to="/Login"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Login
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

      {loggedIn[0 &&
      <Link to="/Account"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Account
      </Link>
      }
    </div>
  </div>
      
    </>
  )
}

