import React from 'react'
import emailjs from '@emailjs/browser'
import { Outlet, Link } from "react-router-dom";
import { getUserByEmail, updateKeyInfo } from '../routeToServer';

export default function ForgotPasswordPage(props){

    const form = React.useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form)
      const randValueSelection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$._<>*,#()[]!'
      const keyLength = 30
      const randSelectionLength = randValueSelection.length
      let key = ""
      for (let i = 0; i < keyLength; ++i) {
        let randSelect = Math.floor(Math.random()*randSelectionLength)
        key+=randValueSelection[randSelect]
      }
      form.current.to_key.value = key
      console.log(form.current.to_key.value)
      //1) submit this key to the mongodb, replacing a previously used key or empty if it times out
      //2) on the email, link to a page on our site
      //3) once clicked, retrieve the key of whomever clicked the link, i.e. use their username and email to find the user and get the connected key
      //4) if the key is not expired, show the page to reset your password
      //5) if the key is expired or does not exist, link them to send another email, max three attempts within a timeframe to prevent spam
      async function validateEmail() {
        let emailTruth = false
        const emailResponseVal = await getUserByEmail(form.current[1].value)

        console.log(emailResponseVal[0])
        if ((await emailResponseVal)[0])
          emailTruth = true
        return emailTruth
      }

      async function sendEmail() {
        if (await validateEmail()) {
          const addKeyResponse = await updateKeyInfo(form.current[1].value, form.current.to_key)
          emailjs.sendForm('service_k5mmp7a', 'template_c9a9xhk', form.current, 'QN5phbtNir0brALN5')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }
      }
      sendEmail()

    }

    return(
        <div>
            <h1>Whoops, I forgot my password.</h1>
            <form style={{display: "block"}} ref={form} onSubmit={sendEmail}>
              <label>Name:</label>
              <input style={{margin: "5px", padding: "5px"}} type="text" name="to_name" />
              <label>Email:</label>
              <input style={{margin: "5px", padding: "5px"}} type="email" name="to_email" />
              <input type='hidden' name="to_key"/>
              <input type="submit" value="Send" />
            </form>
            <div style={{visibility:"hidden"}} id="accountNotFoundError">We do not have an account associated with that email address.</div>
            <Link to='/'><input type="submit" value="Return To Last Page" id="returnToLoginButton"/></Link>
        </div>
    );
}
