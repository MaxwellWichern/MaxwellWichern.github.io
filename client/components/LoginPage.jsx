import React from 'react'

export default function LoginPage(props) {

    const[userNameText,setUserNameText] = React.useState("");

    const[passwordText,setPasswordText] = React.useState("");

    const submitCredentials = (e) => {
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");

        if(userNameText == ""){
            if(passwordText == ""){
                passwordErrorMessage.style.visibility = "visible";
            }
            usernameErrorMessage.style.visibility = "visible";
            return;
        }
        if(passwordText == ""){
            passwordErrorMessage.style.visibility = "visible";
            return;
        }
        usernameErrorMessage.style.visibility = "hidden";
        passwordErrorMessage.style.visibility = "hidden";

        console.log("Username is: " + userNameText);
        console.log("Password is: " + passwordText);
    }

  return(
    <div>
        <h1>Login Page</h1>
        <input type="text" id = "usernameInput" onChange={(e) => {setUserNameText(e.target.value)}}/>
        <div style={{visibility: "hidden"}} id = "usernameErrorMessage">Username is empty.</div>
        <input type="text" id = "passwordInput" onChange={(e) => {setPasswordText(e.target.value)}}/>
        <div style={{visibility: "hidden"}} id="passwordErrorMessage">Password is empty.</div>
        <input type="submit" id="credentialSubmit" onClick={submitCredentials} value="Submit"/>
    </div>
  )
}