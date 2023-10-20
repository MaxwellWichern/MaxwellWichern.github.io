import React from 'react'

export default function ForgotPasswordPage(props){
    const {setter1, setter2, setter3} = props;

    const [emailInput, setEmailInput] = React.useState("");

    const sendRequestEmail = (e) => {
        //This will be updated with code once we figure out how to send an email.
        console.log("Email Address is " + emailInput);
    }

    const returnToLogin = (e) => {
        setter1(true)
        setter2(false)
        setter3(false)
    }

    return(
        <div>
            <h1>Whoops, I forgot my password.</h1>
            <div>Enter your Email Address<input type="text" onChange={(e) => {setEmailInput(e.target.value)}}/></div>
            <div><input type="submit" value="Send Password Request" onClick={sendRequestEmail}/></div>
            <div><input type="submit" value="Return To Login" onClick={returnToLogin}/></div>
        </div>
    );
}