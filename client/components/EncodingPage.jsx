import React from 'react'
import MyDropzone from './MyDropzone'

const formArea = {
  background: 'grey',
  display: 'center'
}


export default function EncodingPage(props) {


  const [imageSelect, setImageSelect] = React.useState(true)


  return(
    <>
      <h2>Encode your image!</h2>
      <div style={{ alignItems: 'center'}}>
        <form name="inputForm" style={formArea}>


          <MyDropzone purpose='Use This Image To Hide'/>

          {imageSelect && <MyDropzone purpose='Hide This Image'/>}

          {!imageSelect && <label htmlFor="hiddenTextField" id="hiddenTextContainer">
            <input type="text" id="hiddenTextField"/>

          </label>}
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </form>
        <div>
          <input type="radio" name="messageType" value="image" onClick={()=>{setImageSelect(true)}}/>
          <input type="radio" name="messageType" value="text"onClick={()=>{setImageSelect(false)}}/>
        </div>




        <div>

        </div>

      </div>
    </>
  )
}
