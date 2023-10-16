import React from "react";

import LoginPage from './LoginPage.jsx'
import CreateAccountPage from './CreateAccountPage.jsx';

export default function LoginPageCenter(){

    const [showLoginPage,setShowLoginPage] = React.useState(true);
    const [showCreateAccountPage, setShowCreateAccountPage] = React.useState(false);
    const [showForgotPasswordPage, setShowForgotPasswordPage] = React.useState(false);

    return(
        <div>
            {showLoginPage && <LoginPage/>}
            {showCreateAccountPage && <CreateAccountPage/>}
        </div>
    )
}