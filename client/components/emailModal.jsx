import React from 'react'
import emailjs from '@emailjs/browser'
import { Modal } from 'bootstrap'


export default function EmailModal(props) {
  const {open, onClose} = props


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
      }
      else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])

  const form = React.useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form)
    //validate email in the server
    //if validated, send this email
    emailjs.sendForm('service_k5mmp7a', 'template_c9a9xhk', form.current, 'QN5phbtNir0brALN5')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return(
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <h1>
              Reset Your Password
            </h1>
            <h3>
              Enter your Name and your email
            </h3>
          </div>
          <div className="modal-body">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="to_name" />
            <label>Email</label>
            <input type="email" name="to_email" />
            <input type="submit" value="Send" />
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


