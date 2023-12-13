import React from 'react'
import bcrypt from 'bcryptjs'

import { addUser } from '../routeToServer';

export default function CreateAccountPage(props){
    const {setter1, setter2, setter3} = props

    const [createAccountUsernameText, setCreateAccountUsernameText] = React.useState("");
    const [createAccountPasswordText, setCreateAccountPasswordText] = React.useState("");
    const [createAccountEmailText, setCreateAccountEmailText] = React.useState("");

    const createAccount = async (e) => {
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");
        const emailErrorMessage = document.getElementById("emailErrorMessage");
        if(createAccountUsernameText == ""){
            usernameErrorMessage.style.visibility = "visible";
        }else{
            usernameErrorMessage.style.visibility = "hidden";
        }
        if(createAccountEmailText == ""){
            emailErrorMessage.style.visibility = "visible";
        }else{
            emailErrorMessage.style.visibility = "hidden";
        }
        if(createAccountPasswordText == ""){
            passwordErrorMessage.innerHTML = "Password cannot be empty.";
            passwordErrorMessage.style.visibility = "visible";
        }else{
            passwordErrorMessage.style.visibility = "hidden";
        }
        if(createAccountUsernameText != "" &&
            createAccountPasswordText != "" &&
            createAccountEmailText != ""){
                passwordErrorMessage.innerHTML = "Attempting to create new account...";
                passwordErrorMessage.style.visibility = "visible";
                const salt = await bcrypt.genSalt(10)
                const secPass = await bcrypt.hash(createAccountPasswordText, salt)
                const user = {
                    userName: createAccountUsernameText,
                    userPw: secPass,
                    email: createAccountEmailText
                }
                const result = addUser(user)
                result.then(
                    function(value){
                        if(value.success){
                            passwordErrorMessage.innerHTML = "Added new user successfully!";
                        }else{
                            passwordErrorMessage.innerHTML = "Failed to add new user";
                        }
                    }
                )

            /*
            const qResult = getUserByUsername(createAccountUsernameText)
            qResult.then(
                function(value) {
                    if(value.length==0){
                        const qResult2 = getUserByEmail(createAccountEmailText)
                        qResult2.then(
                            function(value2) {
                                if(value2.length==0){
                                    //Add new user to Mongo
                                }else{
                                    passwordErrorMessage.innerHTML = "A user with that email already exists.";
                                    passwordErrorMessage.style.visibility = "visible";
                                }
                            },
                            function(error) {console.error(error)}
                        )
                    }else{
                        passwordErrorMessage.innerHTML = "A user with that username already exists";
                        passwordErrorMessage.style.visibility = "visible";
                    }
                },
                function(error) {console.error(error)}
            )
            */
        }

    }

    const returnToLogin = (e) => {
        setter1(true)
        setter2(false)
        setter3(false)
    }

    return(
        <div>
            <h1>Create Your Account</h1>
            <div>Enter Your Username: <input type="text" id="enterUsername" onChange={(e) => {setCreateAccountUsernameText(e.target.value)}}/></div>
            <div style={{visibility: "hidden"}} id = "usernameErrorMessage">Username cannot be empty.</div>
            <div>Enter Your Email: <input type="text" id="enterEmail" onChange={(e) => {setCreateAccountEmailText(e.target.value)}}/></div>
            <div style={{visibility: "hidden"}} id = "emailErrorMessage">Email cannot be empty.</div>
            <div>Enter Your Password: <input type="password" id="enterPassword" onChange={(e) => {setCreateAccountPasswordText(e.target.value)}}/></div>
            <div style={{visibility: "hidden"}} id = "passwordErrorMessage">Password cannot be empty.</div>
            <div><input type="submit" id="submitInformation" onClick={createAccount}/></div>
            <div><input type="submit" id="returnToLogin" onClick={returnToLogin} value="Return To Login"/></div>
        </div>
    );
}
