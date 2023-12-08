import React from 'react'
import emailjs from '@emailjs/browser'
import { Outlet, Link } from "react-router-dom";
import { getUserByEmail, updateKeyInfo } from '../routeToServer';

export default function ForgotPasswordPage(props){
    const {setter1, setter2, setter3} = props

    const form = React.useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      const randValueSelection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$._<>*,#()[]!'
      const keyLength = 30
      const randSelectionLength = randValueSelection.length
      let key = ""
      for (let i = 0; i < keyLength; ++i) {
        let randSelect = Math.floor(Math.random()*randSelectionLength)
        key+=randValueSelection[randSelect]
      }
      form.current.to_key.value = key

      async function validateEmail() {
        let emailTruth = false
        const emailResponseVal = await getUserByEmail(form.current[1].value)

        if ((await emailResponseVal)[0])
          emailTruth = true
        return emailTruth
      }

      async function sendEmail() {
        if (await validateEmail()) {
          const addKeyResponse = await updateKeyInfo(form.current[1].value, form.current.to_key)
          emailjs.sendForm('service_k5mmp7a', 'template_c9a9xhk', form.current, 'QN5phbtNir0brALN5')
            .then((result) => {
                //console.log(result.text);
            }, (error) => {
                //console.log(error.text);
            });
        }
      }
      sendEmail()

    }

    const returnToLogin = () => {
      setter1(true)
      setter2(false)
      setter3(false)
    }

    return(
        <div>
            <h1>Whoops, I forgot my password.</h1>
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
            <div style={{visibility:"hidden"}} id="accountNotFoundError">We do not have an account associated with that email address.</div>
            <input type="submit" value="Return To Last Page" id="returnToLoginButton" onClick={returnToLogin}/>
        </div>
    );
}
