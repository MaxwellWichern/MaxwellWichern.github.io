import React from 'react'

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
            console.log("Username is empty.");
        }else{
            usernameErrorMessage.style.visibility = "hidden";
        }
        if(createAccountEmailText == ""){
            emailErrorMessage.style.visibility = "visible";
            console.log("Email is empty.");
        }else{
            emailErrorMessage.style.visibility = "hidden";
        }
        if(createAccountPasswordText == ""){
            passwordErrorMessage.style.visibility = "visible";
            console.log("Password is empty.");
        }else{
            passwordErrorMessage.style.visibility = "hidden";
        }
        if(createAccountUsernameText != "" &&
            createAccountPasswordText != "" &&
            createAccountEmailText != ""){
            console.log("Nothing is empty.");

            //We need to insert the new user into Mongo from here.
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
            <div>Enter Your Password: <input type="text" id="enterPassword" onChange={(e) => {setCreateAccountPasswordText(e.target.value)}}/></div>
            <div style={{visibility: "hidden"}} id = "passwordErrorMessage">Password cannot be empty.</div>
            <div><input type="submit" id="submitInformation" onClick={createAccount}/></div>
            <div><input type="submit" id="returnToLogin" onClick={returnToLogin} value="Return To Login"/></div>
        </div>
    );
}