import React from 'react'
import MyDropzone from './MyDropzone'
import { CredentialsContext } from './App'

const pageStyle = {
  align: 'center',
  display: 'flex'
}

export default function DecodingPage(props) {
  const {loggedIn} = React.useContext(CredentialsContext)
  const [imageSelect, setImageSelect] = React.useState(false)
  const [outputText, setOutputText] = React.useState(null)
  const [showHistoryModal, setShowHistoryModal] = React.useState(false)

  const [imageToDecode, setImageToDecode] = React.useState({
    content: null,
    preview: null,
    imgData: null
  })

  const onSubmission = (e) => {

    e.preventDefault()
    let result = {"DecoderImage": imageToDecode.imgData}

    //send submission to python flask here

    const textOutput = document.getElementById('decodedText')

    //temporary submission test, will replace with return string from python flask
    setOutputText('Submitted Here And a really long string now w w w a  a a a a a    a a  a  a a  a  a  a a  a ')
    console.log(result)
  }

  function mouseEntered(e) {
    e.target.style.background = 'grey'
    e.target.style.color = 'white'
  }

  function mouseLeft(e) {
    e.target.style.background = 'white'
    e.target.style.color = 'black'
  }

  return(
    <>
    <h2>Decode your image!</h2>
    <div style={pageStyle}>

      <div style={{display: 'grid', placeItems: 'center'}}>
        {loggedIn[0] && <div id="HistoryImageButton"
          style={{textAlign: 'center', width: '150px', background: 'white', cursor: 'pointer', border: 'outset 2px', boxShadow: '0 0 0px 0px', margin: '5px', padding: '5px'}}
          onMouseEnter={(e)=>{mouseEntered(e)}}
          onMouseLeave={(e)=>{mouseLeft(e)}}
          onClick={()=>{setShowHistoryModal(true)}}
          >
          History
        </div>}
        <MyDropzone imageFile={imageToDecode} setImageFile={setImageToDecode} purpose='Decode This Image'/>
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
        <img id='outputEncoded' style={{width: '400px', height: '200px', background: 'grey', border: 'solid 1px', borderRadius: '15%'}} src="#"/>
        {/*<a download="#" href="#" title='downloadDecoded'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </a>*/}
      </div>}
    </div>
    </>
  )
}
