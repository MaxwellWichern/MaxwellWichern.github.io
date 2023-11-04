import React from 'react'

import EncodingPage from './EncodingPage.jsx'
import InstructionPage from './InstructionPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import DecodingPage from './DecodingPage.jsx'
import AboutPage from './AboutPage.jsx'
import AccountPage from './AccountPage.jsx'
import LoginPageCenter from './LoginPageCenter.jsx'

import { PagesContext } from './App.jsx'
import { PassThrough } from 'stream'
import PasswordResetPage from './PasswordResetPage.jsx'

const pageStyle = {
  textAlign: 'center',
  height: '100vh'
}

export default function Page(props) {
  const {value1, value2, value3, value4, value5, value6, value7, value8} = React.useContext(PagesContext)

  const [instructionsPage, setInstructionsPage] = value1
  const [encoderPage, setEncoderPage] = value2
  const [decoderPage, setDecoderPage] = value3
  const [dataCollectionPage, setDataCollectionPage] = value4
  const [aboutPage, setAboutPage] = value5
  const [accountPage, setAccountPage] = value6
  const [loginPage, setLoginPage] = value7

  return (
    <>

      <div style={pageStyle}>
        {encoderPage && <EncodingPage/>}
        {decoderPage && <DecodingPage/>}
        {instructionsPage && <InstructionPage/>}
        {dataCollectionPage && <CollectionPage/>}
        {aboutPage && <AboutPage/>}
        {accountPage && <AccountPage/>}
        {loginPage && <LoginPageCenter/>}

      </div>
    </>
  )
}
