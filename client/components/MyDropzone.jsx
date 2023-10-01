import React, {useCallback, useEffect} from 'react'
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
  width: '20%',
  heigh: 'auto',
  margin: '10px',
  padding: '3px'
}


export default function MyDropzone(props) {
  const {purpose} = props
  const [usingImageChosen, setUsingImageChosen] = React.useState(false)
  const [srcFile, setSrcFile] = React.useState(null)

  useEffect(() => {
    async function changeSrc() {
      const element = await document.getElementById('stegOriginal')
      element.src=srcFile
      //console.log(element)
    }
    changeSrc()
  }, [srcFile])



  const onDrop = useCallback((acceptedFile) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = function (e) {

        const binaryStr = reader.result
        //console.log(binaryStr)
        //console.log(e.target)
        setUsingImageChosen(true)
        setSrcFile(e.target.result)
      }
      try{
        reader.readAsDataURL(acceptedFile[0])
      } catch (e) {
        console.error(e)
      }


  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      {!usingImageChosen && <div style={dropzoneStyle} {...getRootProps()}>
        <input name='inputForm' type='file' accept='image/*' {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <p>{purpose}</p>
      </div>}
      {usingImageChosen && <img style={imageStyle} id='stegOriginal' src='#'/>}
    </div>
  )
}
