import React from 'react'

import { Modal } from 'bootstrap'
import { CredentialsContext } from './App'

const stockImgStyle = {
  border: 'solid 6px',
  margin: '6px',
  borderRadius: '20%',
  cursor: 'pointer'
}

export default function HistoryModal(props) {
  //open - modal is open or not; onClose - function when modal closes; passImage/passSetImage - set the selected image for the encoding
  const {open, onClose, passImage, passSetImage} = props
  //username pulled from context
  const {uName} = React.useContext(CredentialsContext)
  //list of images from aws
  const [encodedImgs, setEncodedImgs] = React.useState([])
  const modalRef = React.useRef()
  const [modalObj, setModalObj] = React.useState(null)

  //use effect for the modal
  React.useEffect( () => {
    if (modalRef.current && !modalObj) {
      const StockModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        onClose()
      })
      setModalObj(StockModal)
    }
  }, [modalRef, onClose])

  //open the modal when the open prop changes
  React.useEffect(() => {
    if (modalObj) {
      if (open) {
        async function getEncoded() {

          try {
            let result = new FormData();
            result.append("User", uName[0])
            result.append("imType", "EncryptedImg")
            //Send image data to python here
            const requestOptions = {
              method: 'POST',
              body: result
            };
            const response = await fetch('http://localhost:8000/user/all/images/', requestOptions)

            if(response.ok) {
              let data = await response.json()
              setEncodedImgs(data.Links)
            } else {
              console.error(`Request for all encoded images failed with status: ${response.status}`);
            }

          } catch (e) {
            console.error("Error:", e);
          }
        }
        getEncoded()
        modalObj.show()
      }
      else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])


  const mouseEntered = (e) => {
    e.target.style.borderColor = 'red'
  }

  const mouseLeft = (e) => {
    e.target.style.borderColor = 'black'
  }

  //called when an image in the modal is clicked
  const mouseClicked = (e) => {
    passSetImage({...passImage, preview: e.target.src})
  }

  return(
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              Select an Encoded Image
            </h2>
          </div>
          <div id="grid" className="modal-body">
            {encodedImgs && encodedImgs.length > 0 ? (
              <div className="row">
                {encodedImgs.map((img) => (
                  <div key={img} className="col-4">
                      <img style={stockImgStyle}
                        src={img}
                        className="img-fluid"
                        onMouseEnter={(e)=>{mouseEntered(e)}}
                        onMouseLeave={(e)=>{mouseLeft(e)}}
                        onClick={(e)=>{mouseClicked(e)}}
                        data-bs-dismiss="modal"
                      />
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading your images...</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


