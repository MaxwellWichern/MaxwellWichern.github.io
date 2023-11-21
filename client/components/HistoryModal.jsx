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
  const {open, onClose, passImage, passSetImage} = props
  const {uName} = React.useContext(CredentialsContext)

  const [historyImgs, setHistoryImgs] = React.useState([])
  const modalRef = React.useRef()
  const [modalObj, setModalObj] = React.useState(null)

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
        async function getHistory() {

          try {
            let result = new FormData();
            result.append("User", uName[0])
            result.append("imType", "OrigImg")
            //Send image data to python here
            const requestOptions = {
              method: 'POST',
              body: result
            };
            const response = await fetch('http://localhost:8000/user/all/images/', requestOptions)

            if (response.ok) {
              let data = await response.json();
              console.log(data)
              setHistoryImgs(data.Links);
            } else {
              console.error(`Request for all original images failed with status: ${response.status}`);
            }
          } catch (e) {
            console.error("Error:", e);
          }
        }
        getHistory()
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

  const mouseClicked = (e) => {
    passSetImage({picAsFile: null, preview: e.target.src})
  }

  return(
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              Select an Original Image
            </h2>
            {/*<svg style={{float: "right", padding: "7px", cursor: "pointer"}} onClick={onReloadImg} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg> */}
          </div>
          <div id="grid" style={{height: '500px', overflow: 'auto'}}className="modal-body">
            {historyImgs && historyImgs.length > 0 ? (
              <div className="row">
                {historyImgs.map((img) => (
                  <div className="col-4">
                      <img key={img} style={stockImgStyle}
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
              <p>Loading your history...</p>
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


