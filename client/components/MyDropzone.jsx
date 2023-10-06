import React from 'react'
import {useDropzone} from 'react-dropzone'


const dropzoneStyle = {
  background: 'grey',
  borderRadius: '10%',
  border: '3px dashed',
  width: '300px',
  height: '200px',
  margin: '10px',
  padding: '3px'
}

const imageStyle = {
  maxWidth: '500px',
  maxHeight: '500px'
}


export default function MyDropzone(props) {
  const {imageFile, setImageFile, purpose} = props

  React.useEffect(
    () => {
        if(!imageFile.content){
            setImageFile({
                ...imageFile,
                preview: undefined
            })
            return
        }
        const objectUrl = URL.createObjectURL(imageFile.content)
        setImageFile({
            ...imageFile,
            preview: objectUrl
        })
    },
    [imageFile.content]
  )

  const canvasRef = React.useRef(null)
  const onLoadImage = () => {
    const canvas = canvasRef
    if (canvas.current !== null) {
      const imageToShow = document.getElementById('showToCanvas')
      const canvasShown = document.getElementById('canvasShown')
      canvasShown.width=imageToShow.naturalWidth
      canvasShown.height=imageToShow.naturalHeight
      const canvasContext = canvas.current.getContext('2d')
      canvasContext.drawImage(imageToShow, 0,0, imageToShow.naturalWidth, imageToShow.naturalHeight)
      setImageFile({
        ...imageFile,
        imgData: canvas.current.getContext('2d').getImageData(0,0, imageToShow.naturalWidth, imageToShow.naturalHeight)
      })
      canvasShown.style.display='none'
    }
  }


  const onDrop = (acceptedFiles) => {
    setImageFile({
        ...imageFile,
        content: acceptedFiles[0]
    })
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  return (
    <div>
      { (imageFile.preview)
      ?
      <div style={{background: 'grey'}}>
        <canvas id="canvasShown" ref={canvasRef}/>
        <img style={imageStyle} id="showToCanvas" onLoad={onLoadImage} src={imageFile.preview}/>
      </div>
      :
      <div style={dropzoneStyle} {...getRootProps()}>
        <input type='file' accept='image/*' {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <p>{purpose}</p>
      </div>}


    </div>
  )
}
