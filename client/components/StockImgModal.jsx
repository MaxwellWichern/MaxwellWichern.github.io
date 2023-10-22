import React from 'react'

import { Modal } from 'bootstrap'

const stockImgStyle = {
  border: 'solid 6px',
  margin: '6px',
  borderRadius: '20%',
  cursor: 'pointer'
}
// const CAT_URL = process.env.REACT_APP_CATS_API_KEY ?? 'unknown'

export default function StockImgModal(props) {
  const {open, onClose, passImage, passSetImage} = props

  const url = 'live_PCeKznFMTKvNiNZIgDjSkfnqReEhOjPrnhMdnFjgD7PRRic2AodbalAcjj8G0ZQP'

  const [stockImgs, setStockImgs] = React.useState([])
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
        async function getStocks() {
          const limit = 9
          try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {
              headers: { 'x-api-key': url },
            });

            if (response.ok) {
              let data = await response.json();
              for (let i = 0; i < limit; ++i) {
                let extension = data[i].url.split('.').pop()
                if (extension != 'jpg') {
                  let individual
                  let individualData
                  while (extension != 'jpg') {
                    try {
                      individual = await fetch('https://api.thecatapi.com/v1/images/search', {
                        headers: { 'x-api-key': url },
                      });
                    }
                    catch (e) {
                      console.log('Could not retrieve new image for the replaced extension')
                      console.error(e)
                    }
                    console.log('Successfully retrieved new Image')
                    individualData = await individual.json()
                    extension = individualData[0].url.split('.').pop()
                  }
                  data[i] = individualData[0]
                }
              }
              setStockImgs(data);
            } else {
              console.error(`Request failed with status: ${response.status}`);
            }
          } catch (e) {
            console.error("Error:", e);
          }
        }
        getStocks()
        modalObj.show()
      }
      else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])

  React.useEffect(() => {
    console.log(stockImgs)
    if (stockImgs.length > 0)
      for (let i = 0; i < 9; ++i)
        console.log(stockImgs[i].url)
  },[stockImgs])

  const mouseEntered = (e) => {
    e.target.style.borderColor = 'red'
  }

  const mouseLeft = (e) => {
    e.target.style.borderColor = 'black'
  }

  const mouseClicked = (e) => {
    passSetImage({...passImage, preview: e.target.src})

  }

  return(
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              Select a Cat!
            </h2>
          </div>
          <div id="grid" className="modal-body">
            {stockImgs && stockImgs.length > 0 ? (
              <div className="row">
                {stockImgs.map((img) => (
                  <div key={img.id} className="col-4">
                      <img style={stockImgStyle}
                        src={img.url}
                        alt={`Cat ${img.id}`}
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
              <p>Loading cat images...</p>
            )}
          </div>
          <div className="modal-footer">
            <p>Close & reopen the Modal to select new images</p>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}


