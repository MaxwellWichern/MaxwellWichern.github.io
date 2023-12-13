import React from 'react'
import emailjs from '@emailjs/browser'
import { Outlet, Link } from "react-router-dom";
import { getUserByEmail, updateKeyInfo } from '../routeToServer';

//Page where user requests permission to change their password
export default function ForgotPasswordPage(props){
    //variables to reset to login page
    const {setter1, setter2, setter3} = props
    const [successfulSent, setSuccessfulSent] = React.useState(false)
    const [sentMessage, setSentMessage] = React.useState("")
    const form = React.useRef();

    //function sends the email after validating and constructing a key
    const sendEmail = async (e) => {
      e.preventDefault();
      //selection of characters to be in the URL parameter
      const randValueSelection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$._<>*,#()[]!'
      const keyLength = 30
      const randSelectionLength = randValueSelection.length
      let key = ""
      //create the key of length 'keylength' (30)
      for (let i = 0; i < keyLength; ++i) {
        let randSelect = Math.floor(Math.random()*randSelectionLength)
        key+=randValueSelection[randSelect]
      }
      form.current.to_key.value = key

      //validate the email provided
      async function validateEmail() {
        let emailTruth = false
        const emailResponseVal = await getUserByEmail(form.current[1].value)

        if ((await emailResponseVal)[0])
          emailTruth = true
        return emailTruth
      }
      console.log('Sending email pre function')
      console.log(await validateEmail())
      //send the email if valid with the form data and key
      async function sendEmailFinal() {
        if (await validateEmail()) {
          //add key to mongo
          const addKeyResponse = await updateKeyInfo(form.current[1].value, form.current.to_key)
          //send email
          emailjs.sendForm('service_k5mmp7a', 'template_c9a9xhk', form.current, 'QN5phbtNir0brALN5')
            .then((result) => {
              setSuccessfulSent(true)
              setSentMessage("Successfully sent email")
            }, (error) => {
              setSentMessage("Failed to send email")
            });
        }
        else {
          setSentMessage("No account associated with said email")
        }
      }
      sendEmailFinal()

    }

    const returnToLogin = () => {
      setter1(true)
      setter2(false)
      setter3(false)
    }

    return(
      <div className="w3-row-padding w3-padding-64 w3-display-container" style={{height:'100%'}}>
        <div className="w3-display-topmiddle">
          <div style={{display: 'grid', placeItems: 'center'}}>
            {!successfulSent && <><h1>Whoops, I forgot my password.</h1>
            <form style={{display: "block"}} ref={form} onSubmit={sendEmail}>
              <div>
              <label>Name:</label>
              <input style={{margin: "5px", padding: "5px"}} type="text" name="to_name" />
              </div>
              <div>
              <label>Email:</label>
              <input style={{margin: "5px", padding: "5px"}} type="email" name="to_email" />
              </div>
              <input type='hidden' name="to_key"/>
              <input type="submit" value="Send" />
            </form>
            <div style={{visibility:"hidden"}} id="accountNotFoundError">We do not have an account associated with that email address.</div></>}
            <h3>{sentMessage}</h3>
            <input type="submit" value="Return To Last Page" id="returnToLoginButton" onClick={returnToLogin}/>
            </div>
        </div>
      </div>
    );
}
