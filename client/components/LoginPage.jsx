import React from 'react'
import { CredentialsContext } from './App';
import { getUserByCredentials } from '../routeToServer';
import { useNavigate } from 'react-router-dom';


export default function LoginPage(props) {
    const {setter1, setter2, setter3} = props
    const {uId, uName, uEmail, loggedIn} = React.useContext(CredentialsContext)

    const [userId, setUserId] = uId
    const [userName, setUserName] = uName
    //const [userPassword, setUserPassword] = uPassword
    const [userEmail, setUserEmail] = uEmail
    const [isLoggedIn, setIsLoggedIn] = loggedIn

    const[userNameText,setUserNameText] = React.useState("");
    const[passwordText,setPasswordText] = React.useState("");
    let navigate = useNavigate();

    const submitCredentials = (e) => {
        //Get the html elements for the error messages
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");
        usernameErrorMessage.style.visibility = "hidden";
        passwordErrorMessage.style.visibility = "hidden";

        if(userNameText == ""){
            usernameErrorMessage.style.visibility = "visible";
        }
        if(passwordText == ""){
            passwordErrorMessage.innerHTML = "Password is empty.";
            passwordErrorMessage.style.visibility = "visible";
        }
        if(passwordText != "" && userNameText != ""){
            const usersResult = getUserByCredentials({userName:userNameText, userPw:passwordText})
            usersResult.then(
                function(value) {
                    if(value.length > 0){ //We have a user with the same credentials
                        setUserId(value[0]._id)
                        setUserName(value[0].userName)
                        //setUserPassword(value[0].userPw)
                        setUserEmail(value[0].email)
                        setIsLoggedIn(true)

                        //Send the user to the instructions page
                        navigate("/Instructions");

                    }else{  //We do not have a user with the same credentials
                        setUserName("")
                        setUserId("")
                        //setUserPassword("")
                        setUserEmail("")
                        setIsLoggedIn(false)
                        passwordErrorMessage.innerHTML="Login Attempt Failed.";
                        passwordErrorMessage.style.visibility = "visible";
                    }
                },
                function(error) {console.error(error)}
            )

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
    <div id="login">
        <h1>Login Page</h1>
        <div>Username: <input type="text" id = "usernameInput" onChange={(e) => {setUserNameText(e.target.value)}}/></div>
        <div style={{visibility: "hidden"}} id = "usernameErrorMessage">Username is empty.</div>
        <div>Password: <input type="password" id = "passwordInput" onChange={(e) => {setPasswordText(e.target.value)}}/></div>
        <div style={{visibility: "hidden"}} id="passwordErrorMessage">Password is empty.</div>
        <div>
            <input type="submit" id="forgotPassword" onClick={forgotPassword} value="Forgot Password"/>
            <input type="submit" id="credentialSubmit" onClick={submitCredentials} value="Log In"/>
            <input type="submit" id="createAccount" onClick={createAccount} value="Create An Account"/>
            {/*<input type="submit" id="showCreds" onClick={(e)=>{
                console.log(userName)
                console.log(userPassword)
                console.log(userEmail)
            }} value="Show Creds"/>*/}
        </div>
    </div>
  )
}
