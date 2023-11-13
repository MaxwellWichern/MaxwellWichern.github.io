import React from 'react'
import {getSomething,deleteSomething,getById,deleteByName} from '../routeToServer.js'

export default function AboutPage(props) { 

  const derekTestFunction = (e) => { 

 
    getSomething();

    //deleteSomething(123456789);
    deleteByName('user1');
    //getById(123456888);
 
getSomething();


} 
  return (
  <div id="about">
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
  {/* Header */}
  <header
    className="w3-container w3-theme-d2 w3-center"
    style={{ padding: "128px 16px" }}
  >
    <h1 className="w3-display-container">
    <img
    src="https://www.w3schools.com/w3css/img_lights.jpg"
    className="w3-image"
    style={{ width: "100%" }}
    />
    <a href='login' className="w3-button w3-black w3-display-middle w3-large">
      Get Started
    </a>
    <div className="w3-display-topmiddle w3-container w3-margin w3-jumbo">Stegonagraphy</div>

    </h1>
  </header>
  {/* First Grid */}
  <div className="w3-row-padding w3-padding-64 w3-container">
    <div className="w3-content">
      <div className="w3-twothird w3-text-theme">
        <h1>Lorem Ipsum</h1>
        <h5 className="w3-padding-32">Stuff Stuff Stuff</h5>
        <p className="w3-text-grey">Stuff Stuff Stuff</p>
      </div>
      <div className="w3-third w3-center">
        <i className="fa fa-anchor w3-padding-64 w3-text-pink" />
      </div>
    </div>
  </div>
  {/* Second Grid */}
  <div className="w3-row-padding w3-theme-l4 w3-padding-64 w3-container">
    <div className="w3-content">
      <div className="w3-third w3-center">
        <i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right" />
      </div>
      <div className="w3-twothird">
        <h1>Lorem Ipsum</h1>
        <h5 className="w3-padding-32">Stuff Stuff Stuff</h5>
        <p className="w3-text-grey">Stuff Stuff Stuff</p>
      </div>
    </div>
  </div>
  <div className="w3-container w3-theme-d3 w3-center w3-opacity w3-padding-64">
    <h1 className="w3-margin w3-xlarge">Made by team stegonography</h1>
  </div>
  {/* Footer */}

  </div>
)


}
