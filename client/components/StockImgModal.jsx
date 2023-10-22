import React from 'react'

import { Modal } from 'bootstrap'

export default function StockImgModal(props) {
  const {open, onClose} = props
  //const url = process.env.CATS_API_KEY ?? 'unknown'
  const url = 'live_PCeKznFMTKvNiNZIgDjSkfnqReEhOjPrnhMdnFjgD7PRRic2AodbalAcjj8G0ZQP'

  const [stockImg, setStockImg] = React.useState([])

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
        modalObj.show()
        async function getStocks() {
          await fetch('https://api.thecatapi.com/v1/images/search?limit=9', {headers: {'x-api-key': url}})
            .then((response) => {
              return response.json()
            })
            .then((data)=>{
              const imagesData = data
              imagesData.map(function(imageData) {
                console.log(imageData)
                setStockImg([...stockImg,{'id': imageData.id, 'url': imageData.url, 'width': imageData.width, 'height': imageData.height}])
                console.log(stockImg)
              })
              console.log(stockImg)
            })
            .catch((e) => {
              console.log("<-- ERROR -->")
              console.error(e)
            })
        }
        getStocks()
      }
      else {
        modalObj.hide()
      }
    }
  }, [open, modalObj, ])


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

          </div>
          <div className="modal-footer">

            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}


