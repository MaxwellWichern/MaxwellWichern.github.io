import React from 'react'
import MyDropzone from './MyDropzone'
import StockImgModal from './StockImgModal'
import { deleteSomething } from '../routeToServer'
import { getSomething } from '../routeToServer'
import { addSomething } from '../routeToServer'
import { CredentialsContext } from './App'
import HistoryModal from './HistoryModal'

const styling = {
  display: 'flex',
  alignItems: 'center'
}

const textStyles = {
  width: '100%',
  height: '200px',
  marginTop: '45px'
}


export default function EncodingPage(props) {
  const {uName,loggedIn} = React.useContext(CredentialsContext)
  const [imageSelect, setImageSelect] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [showHistoryModal, setShowHistoryModal] = React.useState(false)

  const [originalImage, setOriginalImage] = React.useState({
    picAsFile: null,
    preview: null
  })

  const [hiddenImage, setHiddenImage] = React.useState({
    picAsFile: null,
    preview: null
  })

  const [hiddenText, setHiddenText] = React.useState(null)

  const [outputImage, setOutPutImage] = React.useState(null)

  const onSubmission = async (e) => {
    e.preventDefault()
    let result = new FormData();
    result.append(
      "file",
      originalImage.picAsFile
    )
    result.append("preview", originalImage.preview)

    if (imageSelect)
      result.append("Hidden", hiddenImage.picAsFile)
    else
      result.append("Hidden", hiddenText)

    result.append("User", uName[0])

    //Send image data to python here
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: result
    };
    const post_result = await fetch('http://localhost:8000/user/encode/image/', requestOptions)
    .then(response => response.json())

    setOutPutImage(await post_result.imgLink)
  }

  function justLoaded(e) {
    e.target.style.width=''
    e.target.style.height='400px'
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
    <div className="w3-row-padding w3-padding-64 w3-display-container" style={{height:'100%'}}>
      <div className="w3-display-topmiddle">
      <h2 style={{textAlign: 'center'}}>Encode your image!</h2>
      <div style={styling}>
        <div style={{display: 'grid', placeItems: 'center'}}>
          <div style={{display: 'flex'}}>

              <div id="stockImageButton"
                style={{textAlign: 'center', width: '150px', background: 'white', cursor: 'pointer', border: 'outset 2px', boxShadow: '0 0 0px 0px', margin: '5px', padding: '5px'}}
                onMouseEnter={(e)=>{mouseEntered(e)}}
                onMouseLeave={(e)=>{mouseLeft(e)}}
                onClick={()=>{setShowModal(true)}}
                >
                Stock Images
              </div>

              {loggedIn[0] && <div id="HistoryImageButton"
                style={{textAlign: 'center', width: '150px', background: 'white', cursor: 'pointer', border: 'outset 2px', boxShadow: '0 0 0px 0px', margin: '5px', padding: '5px'}}
                onMouseEnter={(e)=>{mouseEntered(e)}}
                onMouseLeave={(e)=>{mouseLeft(e)}}
                onClick={()=>{setShowHistoryModal(true)}}
                >
                History
              </div>}
          </div>
          <div style={{display:'flex'}}>
            <MyDropzone imageFile={originalImage} setImageFile={setOriginalImage} purpose='Use This Image To Hide'/>
            <StockImgModal
              open={showModal}
              onClose={()=>{setShowModal(false)}}
              passImage={originalImage}
              passSetImage={setOriginalImage}
            />
            <HistoryModal
              open={showHistoryModal}
              onClose={()=>{setShowHistoryModal(false)}}
              passImage={originalImage}
              passSetImage={setOriginalImage}
            />
          </div>
        </div>
        <form name="inputForm"  onSubmit={onSubmission} style={{display: 'flex'}}>
          {!imageSelect && <label htmlFor="hiddenTextField" id="hiddenTextContainer">
            <input style={textStyles} onChange={(e) => {setHiddenText(e.target.value)}} type="text" name='inputForm' id="hiddenTextField"/>
          </label>}
          {imageSelect && <MyDropzone style={{marginTop: '100px'}} imageFile={hiddenImage} setImageFile={setHiddenImage} purpose='Hide This Image'/>}
          <label style={{marginTop: '60px'}}>
            <input style={{ display: "none" }} type='submit' value="Submit"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
            <div>
            <input type="radio" name="messageType" value="image" onClick={()=>{setImageSelect(true)}}/>
            <input defaultChecked type="radio" name="messageType" value="text" onClick={()=>{setImageSelect(false)}}/>
          </div>
          </label>
        </form>

        <img id='outputEncoded' onLoad={(e)=>justLoaded(e)} style={{width: '400px',marginTop: '45px', height: '200px', background: 'grey', border: 'solid 1px', borderRadius: '15%'}} src={outputImage}/>
        </div>
      </div>
    </div>
  )
}
