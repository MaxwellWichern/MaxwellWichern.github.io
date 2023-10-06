import React from 'react'

import PageHeader from './PageHeader.jsx'
import Page from './Page.jsx'
import LoginPage from './LoginPage.jsx'

export const PagesContext = React.createContext(null)


export default function App (props) {

  const [instructionsPage, setInstructionsPage] = React.useState(false)
  const [encoderPage, setEncoderPage] = React.useState(false)
  const [decoderPage, setDecoderPage] = React.useState(false)
  const [dataCollectionPage, setDataCollectionPage] = React.useState(false)
  const [aboutPage, setAboutPage] = React.useState(true)
  const [accountPage, setAccountPage] = React.useState(false)

  return (
    <div>
      <PagesContext.Provider value={{
        value1: [instructionsPage, setInstructionsPage],
        value2: [encoderPage, setEncoderPage],
        value3: [decoderPage, setDecoderPage],
        value4: [dataCollectionPage, setDataCollectionPage],
        value5: [aboutPage, setAboutPage],
        value6: [accountPage, setAccountPage]
        }}>
        <PageHeader title='Steganography'/>
        <LoginPage/>
        <Page/>
      </PagesContext.Provider>
    </div>
  )
}
