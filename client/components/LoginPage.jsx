import React from 'react'
import { getUserByCredentials } from '../routeToServer';

export default function LoginPage(props) {
    const {setter1, setter2, setter3} = props

    const[userNameText,setUserNameText] = React.useState("");
    const[passwordText,setPasswordText] = React.useState("");

    const submitCredentials = (e) => {
        //Get the html elements for the error messages
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");

        if(userNameText == ""){
            usernameErrorMessage.style.visibility = "visible";
        }
        if(passwordText == ""){
            passwordErrorMessage.style.visibility = "visible";
        }
        if(passwordText != "" && userNameText != ""){
            const usersJson = getUserByCredentials({userName:userNameText, userPw:passwordText})
            console.log(usersJson)
        }
    }

    const forgotPassword = (e) => {
        setter1(false)
        setter2(false)
        setter3(true)
    }

    const createAccount = (e) => {
        setter1(false)
        setter2(true)
        setter3(false)
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