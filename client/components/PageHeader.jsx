import React from 'react'
import PropTypes from 'prop-types'
import { CredentialsContext, PagesContext } from './App.jsx'
import { Outlet, Link } from "react-router-dom";
import SGlassLogo from '../../server/resources/SGlassLogo.jpg'

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
    <div className="w3-bar w3-red w3-card w3-left-align w3-large" style={{height:'10%'}}>
      <a
        className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red"
      >
        <i className="fa fa-bars" />
      </a>

      {/*<img src={SGlassLogo} className={'w3-bar-item w3-hide-small w3-image'} style={{'width': '100px'}}/>*/}
      <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-hover-white">
        Home
      </Link>
      <Link to="/Instructions"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Instructions
      </Link>
      <Link to="/Encoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Encoder
      </Link>
      <Link to="/Decoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Decoder
      </Link>
      <Link to="/Collections"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Collections
      </Link>

      {!loggedIn[0] &&
      <Link to="/Login"
        className="w3-bar-item w3-button w3-right w3-hide-small w3-padding-large w3-hover-white"
      >
        Login
      </Link>
      }

      {loggedIn[0] &&
      <Link to="/Account"
        className="w3-bar-item w3-button w3-right w3-hide-small w3-padding-large w3-hover-white"
      >
        Account
      </Link>
      }
      </div>
    </div>
    <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
    <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-hover-white">
        Home
      </Link>
      <Link to="/Instructions"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Instructions
      </Link>
      <Link to="/Encoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Encoder
      </Link>
      <Link to="/Decoding"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Decoder
      </Link>
      <Link to="/Collections"
        className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
      >
        Collections
      </Link>

      {!loggedIn[0] &&
      <Link to="/Login"
        className="w3-bar-item w3-button w3-right w3-hide-small w3-padding-large w3-hover-white"
      >
        Login
      </Link>
      }

      {loggedIn[0] &&
      <Link to="/Account"
        className="w3-bar-item w3-button w3-right w3-hide-small w3-padding-large w3-hover-white"
      >
        Account
      </Link>
      }
  </div>
    </>
  )
}

