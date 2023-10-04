import React from 'react'

import EncodingPage from './EncodingPage.jsx'
import InstructionPage from './InstructionPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import DecodingPage from './DecodingPage.jsx'
import AboutPage from './AboutPage.jsx'
import AccountPage from './AccountPage.jsx'
import LoginPage from './LoginPage.jsx'

import { PagesContext } from './App.jsx'

const pageStyle = {
  textAlign: 'center',
  height: '100vh'
}

export default function Page(props) {
  const {value1, value2, value3, value4, value5, value6} = React.useContext(PagesContext)

  const [instructionsPage, setInstructionsPage] = value1
  const [encoderPage, setEncoderPage] = value2
  const [decoderPage, setDecoderPage] = value3
  const [dataCollectionPage, setDataCollectionPage] = value4
  const [aboutPage, setAboutPage] = value5
  const [accountPage, setAccountPage] = value6

  return (
    <>

      <div style={pageStyle}>
        {encoderPage && <EncodingPage/>}
        {decoderPage && <DecodingPage/>}
        {instructionsPage && <InstructionPage/>}
        {dataCollectionPage && <CollectionPage/>}
        {aboutPage && <AboutPage/>}
        {accountPage && <AccountPage/>}
      </div>
    </>
  )
}
