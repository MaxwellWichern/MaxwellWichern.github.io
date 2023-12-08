import React from 'react'
import PageHeader from './PageHeader.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EncodingPage from './EncodingPage.jsx'
import InstructionPage from './InstructionPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import DecodingPage from './DecodingPage.jsx'
import AboutPage from './AboutPage.jsx'
import AccountPage from './AccountPage.jsx'
import LoginPageCenter from './LoginPageCenter.jsx'
import PasswordResetPage from './PasswordResetPage.jsx'

export const PagesContext = React.createContext(null)

export const CredentialsContext = React.createContext(null)

//App Component providing the Contexts and Router
export default function App (props) {

  //Account information provided through the context,
  const [userId, setUserId] = React.useState("")
  const [userName, setUserName] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div >
      <CredentialsContext.Provider value={{
        uId: [userId, setUserId],
        uName: [userName, setUserName],
        uEmail: [userEmail, setUserEmail],
        loggedIn: [loggedIn, setLoggedIn]
      }}>
        {/*Routes defined to create the Links between pages using the react-router-dom*/}
        <BrowserRouter>
        <PageHeader title='Steganography'/>
        <div className="content">
          <Routes path='/'>
            <Route index element={<AboutPage/>}/>
            <Route path='Instructions' element={<InstructionPage/>}/>
            <Route path='Encoding' element={<EncodingPage/>}/>
            <Route path='Decoding' element={<DecodingPage/>}/>
            <Route path='Collections' element={<CollectionPage/>}/>
            <Route path='Account' element={<AccountPage/>}/>
            <Route path='Login' element={<LoginPageCenter/>}/>
            <Route path='PasswordReset' element={<PasswordResetPage/>}/>
          </Routes>
          </div>
        </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  )
}
