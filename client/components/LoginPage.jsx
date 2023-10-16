import React from 'react'

export default function LoginPage(props) {
    const {setter1, setter2} = props

    const[userNameText,setUserNameText] = React.useState("");
    const[passwordText,setPasswordText] = React.useState("");

    const submitCredentials = (e) => {
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");

        if(userNameText == ""){
            if(passwordText == ""){
                passwordErrorMessage.style.visibility = "visible";
            }else{
                passwordErrorMessage.style.visibility = "hidden";
            }
            usernameErrorMessage.style.visibility = "visible";
            return;
        }
        usernameErrorMessage.style.visibility = "hidden";
        if(passwordText == ""){
            passwordErrorMessage.style.visibility = "visible";
            return;
        }
        passwordErrorMessage.style.visibility = "hidden";

        console.log("Username is: " + userNameText);
        console.log("Password is: " + passwordText);
    }

    const forgotPassword = (e) => {
        console.log("This will be added next sprint.");
    }

    const createAccount = (e) => {
        setter1(false)
        setter2(true)
    }

  return(
    <div>
        <h1>Login Page</h1>
        <div>Username: <input type="text" id = "usernameInput" onChange={(e) => {setUserNameText(e.target.value)}}/></div>
        <div style={{visibility: "hidden"}} id = "usernameErrorMessage">Username is empty.</div>
        <div>Password: <input type="text" id = "passwordInput" onChange={(e) => {setPasswordText(e.target.value)}}/></div>
        <div style={{visibility: "hidden"}} id="passwordErrorMessage">Password is empty.</div>
        <div>
            <input type="submit" id="forgotPassword" onClick={forgotPassword} value="Forgot Password"/>
            <input type="submit" id="credentialSubmit" onClick={submitCredentials} value="Submit"/>
            <input type="submit" id="createAccount" onClick={createAccount} value="Create An Account"/>
        </div>
    </div>
  )
}