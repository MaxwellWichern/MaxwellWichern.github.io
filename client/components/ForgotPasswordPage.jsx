import React from 'react'
import emailjs from '@emailjs/browser'

export default function ForgotPasswordPage(props){
    const {setter1, setter2, setter3} = props;


    const form = React.useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form)

      emailjs.sendForm('service_k5mmp7a', 'template_c9a9xhk', form.current, 'QN5phbtNir0brALN5')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    const returnToLogin = (e) => {
        setter1(true)
        setter2(false)
        setter3(false)
    }

    return(
        <div>
            <h1>Whoops, I forgot my password.</h1>
            <form style={{display: "block"}} ref={form} onSubmit={sendEmail}>
              <label>Name:</label>
              <input style={{margin: "5px", padding: "5px"}} type="text" name="to_name" />
              <label>Email:</label>
              <input style={{margin: "5px", padding: "5px"}} type="email" name="to_email" />
              <input type="submit" value="Send" />
            </form>
            <div style={{visibility:"hidden"}} id="accountNotFoundError">We do not have an account associated with that email address.</div>
            <div><input type="submit" value="Return To Login" onClick={returnToLogin} id="returnToLoginButton"/></div>
        </div>
    );
}
