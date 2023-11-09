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
  const [message, setMessage] = React.useState("Drag 'n' drop some files here, or click to select files")
  React.useEffect(
    () => {
        if(!imageFile.picAsFile){
            setImageFile({
                ...imageFile,
                preview: undefined
            })
            return
        }
        const objectUrl = URL.createObjectURL(imageFile.picAsFile)
        setImageFile({
            ...imageFile,
            preview: objectUrl
        })
    },
    [imageFile.picAsFile]
  )

  const canvasRef = React.useRef(null)
  const onLoadImage = () => {
    const canvas = canvasRef
    if (canvas.current !== null) {
      // const imageToShow = document.getElementById('showToCanvas')
      // const canvasShown = document.getElementById('canvasShown')
      // canvasShown.width=imageToShow.naturalWidth
      // canvasShown.height=imageToShow.naturalHeight
      // const canvasContext = canvas.current.getContext('2d')
      // canvasContext.drawImage(imageToShow, 0,0, imageToShow.naturalWidth, imageToShow.naturalHeight)
      // const imgData = canvas.current.getContext('2d').getImageData(0,0, imageToShow.naturalWidth, imageToShow.naturalHeight)
      // // let copy = []
      // // for (let i = 0; i < imgData.data.length; i++) {
      // //   if ( i % 4 !== 3 ) {
      // //     copy.push(imgData.data[i])
      // //   }
      // // }
      // // setImageFile({
      // //   ...imageFile,
      // //   imgData: copy
      // // })
      canvasShown.style.display='none'
    }
  }


  const onDrop = (acceptedFiles) => {
    try{
      if (acceptedFiles[0].size < 1000) {
        throw new Error("Too small. The image size risks too few bytes")
      }
      else if (acceptedFiles[0].size > 4000000) {
        throw new Error("Too large. The image size will likely cause the file to take too long to process")
      }
      else {
        setImageFile({
          ...imageFile,
          picAsFile: acceptedFiles[0]
        })
      }
    } catch (e) {
      console.error(e)
      setMessage(e)
    }
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
        <input type='file' accept='image/png, image/jpeg, image/jpg' {...getInputProps()} />
        <p>{message}</p>
        <p>{purpose}</p>
      </div>}
    </div>
  )
}
