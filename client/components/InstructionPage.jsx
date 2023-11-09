import React from 'react'

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

export default function InstructionPage(props) {

  const [encode, setEncode] = React.useState(true)
  const [decode, setDecode] = React.useState(false)
  const [account, setAccount] = React.useState(false)

  const encoder = ()=> {
    setEncode(true)
    setDecode(false)
    setAccount(false)
  }

  const decoder = ()=> {
    setEncode(false)
    setDecode(true)
    setAccount(false)
  }

  const accountCheck = ()=> {
    setEncode(false)
    setDecode(false)
    setAccount(true)
  }

  function mouseEntered(e) {
    e.target.style.background = 'grey'
    e.target.style.color = 'white'
  }

  function mouseLeft(e) {
    e.target.style.background = '#f1f1f1'
    e.target.style.color = 'black'
  }

  return(
    <div style={{display: 'block'}}>
      <div>
        <ul style={ulStyle}>
          <li onMouseEnter={(e)=>mouseEntered(e)} onMouseLeave={(e)=>mouseLeft(e)} style={liStyle}><div onClick={encoder}>Encode</div></li>
          <li onMouseEnter={(e)=>mouseEntered(e)} onMouseLeave={(e)=>mouseLeft(e)} style={liStyle}><div onClick={decoder}>Decode</div></li>
          <li onMouseEnter={(e)=>mouseEntered(e)} onMouseLeave={(e)=>mouseLeft(e)} style={liStyle}><div onClick={accountCheck}>Account</div></li>
        </ul>
      </div>

      {encode && <div style={{overflow: 'auto'}}>
        <h1>Encoding Images With Hidden Information</h1>
        <div>
          After clicking on the Encoder tab, you will have access to encode an image with either a hidden message or even another image
        </div>
        <div>
          <img src="../../server/resources/ImageSelectionForDropZone.png"/>
          <div>
            <p>As Shown in the image above, there are a few ways to add an image as the 'Original Image', that is, the image in which a message is to be Hidden. These are not your encoded images, merely cover images</p>
            <p>First, you can select the grey dropzone and add an image anywhere in your file system. It will load in the page upon submission of the image</p>
            <p>Second, You can take an image as a file and drag it into the dropzone, where once again it will be loaded</p>
            <p>Thirdly, with the 'Stock Images' button above the dropzone. This button will prompt the user to select from various 'cat' stock images</p>
            <p>Lastly, with the History button. All images used with an account will be saved and if you have used an image in the past, you can click this button and load those images for selection.</p>
          </div>
          <div>
            <img src="../../server/resources/Screenshot 2023-11-08 222303.png"/>
            <p>Now that an image has been selected, you can see here that there is a text box for you to enter your message</p>
            <p>Optionally, via the buttons underneath the arrow, you can select the other button to hide an image</p>
            <p>On this selection, another dropzone for images will be shown where you can select a new image</p>
          </div>
          <div>
            <p>After Selecting both an Original Image and something to Hide, you may click the arrow to produce your encoded image</p>
            <p>Depending on the size of the image, this will take time, but will appear to the right of the image once completed</p>
            <p>Your Encoded image will automatically be save to your account if you have one, and if you are a guest, it will be temporarily saved</p>
            <p>Guests should save their images to their personal files in case of deletion</p>
          </div>
        </div>
      </div>}

      {decode &&
        <div>
          <h1>Decoding Images</h1>
          <div>
            <p>After Clicking on the Decoder tab, users can have access to decoding images</p>
          </div>
          <div>
            <img src="../../server/resources/Screenshot 2023-11-08 220601.png"/>
            <p>To begin the process of decoding an image, you must first enter an image into the dropzone</p>
            <p>This can be achieved either by clicking the dropzone and selecting an image from your file system, or via dragging a file on top of the image and dropping it in</p>
          </div>
          <div>
            <img src="../../server/resources/Screenshot 2023-11-08 224235.png"/>
            <p>Alternatively, once a user is logged in, they can have access to their list of previously encoded images</p>
            <p>Click the history button to open up a drop down modal where you can select your encoded images to decode</p>
          </div>
          <div>
            <p>Once a user has successfully input an image, select the arrow and begin processing the image</p>
            <p>This may take time depending on how large the image to decode was</p>
            <p>Once the image is decoded, the hidden message or hidden image will be displayed to the right of the arrow for the user to do with as they please</p>
          </div>
        </div>}
        {account &&
        <div>
          <h1>Help with your Account</h1>
        </div>
        }
    </div>
  )
}
