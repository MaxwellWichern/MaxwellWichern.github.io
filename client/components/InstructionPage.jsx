import React from 'react'
import dropzone from '../../server/resources/dropzone.jpg'
import stock_history from '../../server/resources/ImageSelectionForDropZone.jpg'
import sencondHistDrop from '../../server/resources/secondHistoryDropzone.jpg'
import textBox_submit from '../../server/resources/textBoxSubmit.jpg'
import accountChangedInfo from '../../server/resources/accountInfoChange.jpg'
import loginElement from '../../server/resources/loginElement.jpg'
import PasswordResetPage from './PasswordResetPage'
import { useState } from 'react'

const ulStyle = {
  listStyleType: 'none',
  margin: '0px',
  padding: '0px',
  width: '200px',
  backgroundColor: '#f1f1f1',
  borderRight: 'solid 1px',
  borderBottom: 'solid 1px',
  position: 'fixed',
  overflow: 'auto',
  height: '100%'
}

const liStyle = {
  display: 'block',
  color: '#000',
  padding: '8px 16px',
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer'
}

const instructionpagediv = {
  paddingLeft: '200px'
}

export default function InstructionPage(props) {


  const [encodedEnabled, enableEncode] = useState(true);
  const [decodeEnabled, enableDecode] = useState(false);
  const [profileEnabled, enableProfile] = useState(false);

  function encodeTrue () {
    enableEncode(true);
    enableDecode(false);
    enableProfile(false);
  }

  function decodeTrue () {
    enableEncode(false);
    enableDecode(true);
    enableProfile(false);
  }

  function profileTrue () {
    enableEncode(false);
    enableDecode(false);
    enableProfile(true);
  }




  /*const [encode, setEncode] = React.useState(true)
  const [decode, setDecode] = React.useState(false)
  const [account, setAccount] = React.useState(false)

  /*const [encImage1, setEncImage1] = React.useState(null)
  const [encImage2, setEncImage2] = React.useState(null)
  const [decImage1, setDecImage1] = React.useState(null)
  const [decImage2, setDecImage2] = React.useState(null)


  React.useEffect(()=>{
    async function getImages() {
      setEncImage1(await fetch('../resources/ImageSelectionForDropZone.png'))
      setEncImage2(await fetch('../resources/Screenshot 2023-11-08 220601.png'))
      setDecImage1(await fetch('../resources/Screenshot 2023-11-08 222303.png'))
      setDecImage2(await fetch('../resources/Screenshot 2023-11-08 224235.png'))
    }
    getImages()

  }, [])*/

  return(
<div>
<div>
<div id="name" class="w3-sidebar w3-bar-block" style={{width:'10%'}}>
  <button onClick={encodeTrue} class="w3-bar-item w3-button w3-hover-black">Encode</button>
  <button onClick={decodeTrue} class="w3-bar-item w3-button w3-hover-green">Decode</button>
  <button onClick={profileTrue} class="w3-bar-item w3-button w3-hover-blue">Profile</button>
</div>  
<instructionpagediv>
<div style={{marginLeft:'10%'}} className="w3-row-padding w3-container w3-border-left" hidden={!encodedEnabled}>
    <div id="Encode">
      <div className="w3-twothird w3-text-theme">
        <h1>Encoding Images With Hidden Information</h1>
        <h5 className="w3-padding-32 w3-left-align">After clicking on the Encoder tab, you will have access to encode an image with either a hidden message or even another image.</h5>
        <p className="w3-text-grey w3-left-align">To begin the process of encoding an image, you must first input an image into the dropzone.</p>
        <p className="w3-text-grey w3-left-align">This can be achieved either by clicking the dropzone and selecting an image from your file system, or via dragging a file on top of the image and dropping it in.</p>
        <p className="w3-text-grey w3-left-align">Additionally, you could use the 'Stock Images' button above the dropzone. This button will prompt the user to select from various 'cat' stock images to use instead.</p>
        <p className="w3-text-grey w3-left-align">Finally, with the History button. All images used with an account will be saved and if you have used an image in the past, you can click this button and load those images for selection.</p>
      </div>
      <div className="w3-third w3-center">
        <img src={stock_history} class = "w3-card"/>
      </div>
    </div>
  </div>
  <div style={{marginLeft:'10%'}} className="w3-row-padding w3-theme-l4 w3-padding-32 w3-container" hidden={!encodedEnabled}>
    <div id="Encode2">
      <div className="w3-twothird">
        <p className="w3-left-align">Now that an image has been selected, you can see here that there is a text box for you to enter your message.</p>
        <p className="w3-left-align">Optionally, via the buttons underneath the arrow, you can select the other button to hide an image.</p>
        <p className="w3-left-align">Upon selecting this, another dropzone for images will be shown where you can select a new image.</p>
        <p className="w3-left-align">After selecting both the original image and image to hide, you may click the arrow to produce your encoded image. Depending on the size of the image, this will take time, but will appear to the right of the image once completed.</p>
        <p className="w3-left-align">Your encoded image will automatically be save to your account if you have one, and if you are a guest, it will be temporarily saved.</p>
        <p className="w3-left-align">Guests should save their images to their personal files in case of deletion.</p>
      </div>
      <div className="w3-third w3-center">
        <img src={textBox_submit} class = "w3-card"/>
      </div>
    </div>
  </div>

  <div style={{marginLeft:'10%'}} className="w3-row-padding w3-container w3-border-left" hidden={!decodeEnabled}>
    <div id="Decode">
      <div className="w3-twothird w3-text-theme">
        <h1>Decoding Images</h1>
        <h5 className="w3-padding-32 w3-left-align">After clicking on the Decoder tab above, users can have access to decoding images.</h5>
          <p className="w3-text-grey">
          <p className="w3-left-align">To begin the process of decoding an image, you must first input an image into the dropzone.</p>
          <p className="w3-left-align">This can be achieved either by clicking the dropzone and selecting an image from your file system, or via dragging a file on top of the image and dropping it in.</p></p>
      </div>
      <div className="w3-third w3-center">
        <img src={dropzone} class = "w3-card"/>
      </div>
    </div>
  </div>
  <div style={{marginLeft:'10%'}} className="w3-row-padding w3-theme-l4 w3-padding-32 w3-container" hidden={!decodeEnabled}>
    <div id="Decode2">
      <div className="w3-twothird">
        <p className="w3-left-align">Alternatively, once a user is logged in, they can have access to their list of previously encoded images.</p>
        <p className="w3-left-align">Click the history button to open up a drop down module where you can select your encoded images to decode.</p>
        <p className="w3-left-align">Once a user has successfully input an image, select the arrow and begin processing the image.</p>
        <p className="w3-left-align">This may take time depending on how large the image to decode was.</p>
        <p className="w3-left-align">Once the image is decoded, the hidden message or hidden image will be displayed to the right of the arrow for the user to do with as they pleas.</p>
      </div>
      <div className="w3-third w3-center">
      <img src={sencondHistDrop} class = "w3-card"/>
      </div>
    </div>
  </div>
  <div style={{marginLeft:'10%'}} className="w3-row-padding w3-container w3-border-left" hidden={!profileEnabled}>
    <div id="Profile">
      <div className="w3-twothird w3-text-theme">
        <h1>Help with your Account</h1>
        <h5>Editing your account information</h5>
        <p className="w3-text-grey w3-left-align">To change your username or email, you can visit your account page. In either the email or username box,
              you can replace the data with new data. Once satisfied, you can click the submit button and your information
              will be changed as long as neither the username or email are not in use.</p>
      </div>
      <div className="w3-third w3-center">
        <img src={accountChangedInfo} class = "w3-card w3-image"/>
      </div>
    </div>
  </div>
  <div style={{marginLeft:'10%'}} className="w3-row-padding w3-theme-l4 w3-padding-32 w3-container" hidden={!profileEnabled}>
    <div id="Profile2">
      <div className="w3-twothird">
        <h5>Changing your password</h5>
        <p className="w3-left-align">To change your password, you can click forgot my password on the login page. There you can enter an email to send you a link to reset your password.</p>
      </div>
      <div className="w3-third w3-center">
      <img src={loginElement} class = "w3-card w3-image"/>
      </div>
    </div>
  </div>
  </instructionpagediv>
  <div className="w3-container w3-theme-d3 w3-center w3-opacity w3-padding-32">
    <h1 className="w3-margin w3-xlarge">Brought to you by Team Steganography</h1>
  </div>
</div>
</div>

    
  )
}

