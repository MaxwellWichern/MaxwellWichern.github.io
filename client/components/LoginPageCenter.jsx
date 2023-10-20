import React from "react";

import LoginPage from './LoginPage.jsx'
import CreateAccountPage from './CreateAccountPage.jsx';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';

export const LoginContext = React.createContext(null);

export default function LoginPageCenter(){

    const [showLoginPage,setShowLoginPage] = React.useState(true);
    const [showCreateAccountPage, setShowCreateAccountPage] = React.useState(false);
    const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);

    return(
        <div>
            {showLoginPage && <LoginPage setter1 = {setShowLoginPage} setter2 = {setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}
            {showCreateAccountPage && <CreateAccountPage setter1 = {setShowLoginPage} setter2 = {setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}
            {showForgotPasswordPage && <ForgotPasswordPage setter1 = {setShowLoginPage} setter2={setShowCreateAccountPage} setter3={setShowForgotPasswordPage}/>}
        </div>
    )
}