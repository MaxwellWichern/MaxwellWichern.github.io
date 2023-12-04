import React from 'react'
import MyDropzone from './MyDropzone'
import { CredentialsContext } from './App'
import EncodedImageModal from './EncodedImageModal'

const pageStyle = {
  align: 'center',
  display: 'flex'
}

export default function DecodingPage(props) {
  //pulling the username and logged in to 1) connect to aws and 2) to check if the user will see a history modal
  const {uName, loggedIn} = React.useContext(CredentialsContext)
  //if the decoded result is text or image, it will give a result (not in right now because the image-image is not in place yet)
  const [imageSelect, setImageSelect] = React.useState(false)
  //if not image, use text
  const [outputText, setOutputText] = React.useState(null)
  const [showEncodedImageModal, setShowEncodedImageModal] = React.useState(false)

  //State Hook for the image to decode placed in the dropzone. Preview is for the preview link for images downloaded from aws or api and
  //picasFile is for local images from files
  const [imageToDecode, setImageToDecode] = React.useState({
    picAsFile: null,
    preview: null
  })

  //called On the submission of the decoding image
  const onSubmission = async (e) => {

    e.preventDefault()
    let result = new FormData();
    result.append(
      "file",
      imageToDecode.picAsFile
    )
    result.append(
      "preview",
      imageToDecode.preview
    )
    result.append(
      "User",
      uName[0]
    )

    //send submission to python flask here
    const requestOptions = {
      method: 'POST',
      body: result
    };
    const post_result = await fetch('http://localhost:8000/user/decode/image/', requestOptions)
    .then(response => response.json())

    //once image to image is in place, create a condition to either set output text or output image
    setOutputText(await post_result.message)
    justLoaded()
  }

  //TODO - When the image or text is loaded, I want to resize
  function justLoaded() {
    let e = document.getElementById("decodedText")
  }

  //styling when the encoding button is hovered over
  function mouseEntered(e) {
    e.target.style.background = 'grey'
    e.target.style.color = 'white'
  }

  //styling when the encoding button is hovered off
  function mouseLeft(e) {
    e.target.style.background = 'white'
    e.target.style.color = 'black'
  }

  return(
    <>
    <div id="decoder">
    <h2>Decode your image!</h2>
    <div style={pageStyle}>

      <div style={{display: 'grid', placeItems: 'center'}}>
        {loggedIn[0] && <div id="EncodedImageButton"
          style={{textAlign: 'center', width: '150px', background: 'white', cursor: 'pointer', border: 'outset 2px', boxShadow: '0 0 0px 0px', margin: '5px', padding: '5px'}}
          onMouseEnter={(e)=>{mouseEntered(e)}}
          onMouseLeave={(e)=>{mouseLeft(e)}}
          onClick={()=>{setShowEncodedImageModal(true)}}
          >
          Encoded History
        </div>}
        <MyDropzone imageFile={imageToDecode} setImageFile={setImageToDecode} purpose='Decode This Image'/>
        <EncodedImageModal
          open={showEncodedImageModal}
          onClose={()=>{setShowEncodedImageModal(false)}}
          passImage={imageToDecode}
          passSetImage={setImageToDecode}
        />
      </div>

      <form name="submission" onSubmit={onSubmission}>
        <label>
          <input style={{ display: "none" }} type='submit' value="Submit"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </label>
      </form>



      {!imageSelect && <div style={{paddingLeft:'60px',paddingRight:'60px', verticalAlign: 'middle', textAlign: 'center', width: '400px', height: '200px', background: 'grey', border: 'solid 1px', borderRadius: '15%'}} id="decodedText">{outputText}</div> }
      {imageSelect && <div>
        <img id='outputEncoded'  style={{width: '400px', height: '200px', background: 'grey', border: 'solid 1px', borderRadius: '15%'}} src="#"/>
      </div>}
    </div>
    </div>
    </>
  )
}
