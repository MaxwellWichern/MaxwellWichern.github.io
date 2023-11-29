import React from 'react'
import { CredentialsContext } from './App'
import Carousel from './Carousel.jsx'

export default function CollectionPage(props) {
  const {uName} = React.useContext(CredentialsContext)
  const [encodedImgs, setEncodedImgs] = React.useState([])
  const [historyImgs, setHistoryImgs] = React.useState([])

  React.useEffect(()=> {
    async function getEncoded() {
      try {
        let result = new FormData();
        result.append("User", uName[0])
        result.append("imType", "EncryptedImg")
        //Send image data to python here
        const requestOptions = {
          method: 'POST',
          body: result
        };
        const response = await fetch('http://localhost:8000/user/all/images/', requestOptions)

        if(response.ok) {
          let data = await response.json()
          setEncodedImgs(data.Links)
        } else {
          console.error(`Request for all encoded images failed with status: ${response.status}`);
        }

      } catch (e) {
        console.error("Error:", e);
      }
    }
    getEncoded()

    async function getHistory() {

      try {
        let result = new FormData();
        result.append("User", uName[0])
        result.append("imType", "OrigImg")
        //Send image data to python here
        const requestOptions = {
          method: 'POST',
          body: result
        };
        const response = await fetch('http://localhost:8000/user/all/images/', requestOptions)

        if (response.ok) {
          let data = await response.json();
          console.log(data)
          setHistoryImgs(data.Links);
        } else {
          console.error(`Request for all original images failed with status: ${response.status}`);
        }
      } catch (e) {
        console.error("Error:", e);
      }
    }
    getHistory()
  }, [uName])

  return(
    <div>
      <div>
        <h2>
          Original Images
        </h2>
        <div id='originalSet'>
        <div>
            {historyImgs && historyImgs.length > 0 ? (
              <Carousel imageList={historyImgs} imType={'OrigImg'}/>
            ) : (
              <p>Loading your history...</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2>
          Encoded Images
        </h2>
        <div id='encodedSet'>
        <div>
            {encodedImgs && encodedImgs.length > 0 ? (
              <Carousel imageList={encodedImgs} imType={'EncryptedImg'}/>
            ) : (
              <p>Loading your images...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
