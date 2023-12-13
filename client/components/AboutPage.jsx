import React from 'react'
import {getSomething,getById,deleteByName} from '../routeToServer.js'
import StegaLogo from '../../server/resources/StegaLogo.jpg'

export default function AboutPage(props) {

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
  >
    <h1 className="w3-display-container">
    <img
    src="https://miro.medium.com/v2/resize:fit:1200/1*tBgGg5wbAv9yrFvQBHxcLg.jpeg"
    className="w3-image"
    />
    <div class="w3-display-topmiddle w3-container w3-jumbo">Steganography</div>

    <a href='login' className="w3-button w3-black w3-display-middle w3-large">
      Get Started
    </a>

    </h1>
  </header>
  {/* First Grid */}
  <div className="w3-row-padding w3-padding-64 w3-container">
    <div className="w3-content">
      <div className="w3-half w3-text-theme">
        <h1>What is Steganography?</h1>
        <h5 className="w3-padding-32">"The practice of concealing information within another message or physical object to avoid detection."</h5>
        <p className="w3-text-grey w3-left-align">While the simple answer is above, here's a more in-depth definition. Steganography is the practice of representing information within another message or physical object, in such a manner that the presence of the information is not evident to human inspection. In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video. The word steganography comes from Greek steganographia, which combines the words steganós, meaning "covered or concealed", and -graphia meaning "writing". For example, the image to the right here has a hidden message inside, but I bet you would've never noticed!
        </p>
      </div>
      <div className="w3-third w3-right w3-display-container w3-padding-64">
      <img src="https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/01/pol_obama_hoops_0222_55113069.jpg"
    className="w3-display-bottom-right w3-image"
      />
      </div>
    </div>
  </div>
  {/* Second Grid */}
  <div className="w3-row-padding w3-theme-l4 w3-padding-64 w3-container">
    <div className="w3-content">
      <div className="w3-center">
        <img src={StegaLogo} className={'w3-image'}/>
        <h5 className="w3-padding-16">We're just a bunch of CS Majors at UW-Stout.</h5>
        <p className="w3-text-grey w3-right-align">The majority are surprisingly AMCS students, but they're backed up by some of the brightest CS students with focuses in Cybersecurity! Working every Monday, Wednesday, and Friday from 2:30 to 4:30 PM CST.</p>
      </div>
    </div>
  </div>
  <div className="w3-container w3-theme-d3 w3-center w3-opacity w3-padding-32">
    <h1 className="w3-margin w3-xlarge">Brought to you by Team Steganography</h1>
  </div>
  {/* Footer */}
  </div>
)

}
