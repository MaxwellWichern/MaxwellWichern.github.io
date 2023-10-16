import React from 'react'

export default function CreateAccountPage(props){
    
    const [createAccountUsernameText, setCreateAccountUsernameText] = React.useState("");
    const [createAccountPasswordText, setCreateAccountPasswordText] = React.useState("");
    const [createAccountEmailText, setCreateAccountEmailText] = React.useState("");

    const createAccount = async (e) => {
        const usernameErrorMessage = document.getElementById("usernameErrorMessage");
        const passwordErrorMessage = document.getElementById("passwordErrorMessage");
        const emailErrorMessage = document.getElementById("emailErrorMessage");
        if(createAccountUsernameText == ""){
            usernameErrorMessage.style.visibility = "visible";
        }
        if(createAccountPasswordText == ""){
            passwordErrorMessage.style.visibility = "visible";
        }
        if(createAccountEmailText == ""){
            emailErrorMessage.style.visibility = "visible";
        }
        if(createAccountUsernameText != "" &&
            createAccountPasswordText != "" &&
            createAccountEmailText != ""){
            usernameErrorMessage.style.visibility = "hidden";
            passwordErrorMessage.style.visibility = "hidden";
            emailErrorMessage.style.visibility = "hidden";

            //We need to insert the new user into Mongo from here.
        }
        
    }

    return(
        <div>
            <h1>Create Your Account</h1>
            <div>Enter Your Username: <input type="text" id="enterUsername" onChange={setCreateAccountUsernameText}/></div>
            <div style={{visibility: "hidden"}} id = "usernameErrorMessage">Username cannot empty.</div>
            <div>Enter Your Email: <input type="text" id="enterEmail" onChange={setCreateAccountPasswordText}/></div>
            <div style={{visibility: "hidden"}} id = "passwordErrorMessage">Password cannot be empty.</div>
            <div>Enter Your Password: <input type="text" id="enterPassword" onChange={setCreateAccountEmailText}/></div>
            <div style={{visibility: "hidden"}} id = "emailErrorMessage">Email cannot be empty.</div>
            <div>Submit: <input type="submit" id="submitInformation" onClick={createAccount}/></div>
        </div>
    );
}