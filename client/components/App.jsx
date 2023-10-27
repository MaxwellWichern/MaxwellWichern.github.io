import React from 'react'

import PageHeader from './PageHeader.jsx'
import Page from './Page.jsx'

export const PagesContext = React.createContext(null)

export const CredentialsContext = React.createContext(null)

export default function App (props) {

  const [instructionsPage, setInstructionsPage] = React.useState(false)
  const [encoderPage, setEncoderPage] = React.useState(false)
  const [decoderPage, setDecoderPage] = React.useState(false)
  const [dataCollectionPage, setDataCollectionPage] = React.useState(false)
  const [aboutPage, setAboutPage] = React.useState(false)
  const [accountPage, setAccountPage] = React.useState(false)
  const [loginPage, setLoginPage] = React.useState(true)

  const [userName, setUserName] = React.useState("")
  const [userPassword, setUserPassword] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div>
      <CredentialsContext.Provider value={{
        uName: [userName, setUserName],
        uPassword: [userPassword, setUserPassword],
        uEmail: [userEmail, setUserEmail],
        loggedIn: [loggedIn, setLoggedIn]
      }}>
      <PagesContext.Provider value={{
        value1: [instructionsPage, setInstructionsPage],
        value2: [encoderPage, setEncoderPage],
        value3: [decoderPage, setDecoderPage],
        value4: [dataCollectionPage, setDataCollectionPage],
        value5: [aboutPage, setAboutPage],
        value6: [accountPage, setAccountPage],
        value7: [loginPage, setLoginPage]
        }}>
        <PageHeader title='Steganography'/>
        <Page/>
      </PagesContext.Provider>
      </CredentialsContext.Provider>
    </div>
  )
}