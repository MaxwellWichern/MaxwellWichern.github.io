import React from 'react'
import { CredentialsContext, FLASK_URL } from './App'
import Carousel from './Carousel.jsx'

export default function CollectionPage(props) {
  const {uName, loggedIn} = React.useContext(CredentialsContext)
  const [encodedImgs, setEncodedImgs] = React.useState([])
  const [historyImgs, setHistoryImgs] = React.useState([])

  //This Effect Hook is how images are retrieved an loaded from the aws. The effect is put into effect on the change of the uName
  //and loading the page initially
  React.useEffect(()=> {
    //This specifically gets the encoded images from aws by setting up a formdata requesting the types of images
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
        const response = await fetch(FLASK_URL + 'user/all/images/', requestOptions)

        //failure in response results in displaying the status code and or error
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

    //This specifically gets the original images from aws by setting up a formdata requesting the types of images
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
        const response = await fetch(FLASK_URL + 'user/all/images/', requestOptions)

        //failure in response results in displaying the status code and or error
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
            {/*Carousel Element here is only provided if the original images are loaded from aws and have elements in them*/}
            {historyImgs && historyImgs.length > 0 ? (
              <Carousel imageList={historyImgs} imType={'OrigImg'}/>
            ) : (
              <p>Loading your history...</p>
            )}
          </div>
        </div>
      </div>
      {loggedIn[0] && <div>
        <h2>
          Encoded Images
        </h2>
        <div id='encodedSet'>
        <div>
            {/*Carousel Element here is only provided if the encoded images are loaded from aws and have elements in them*/}
            {encodedImgs && encodedImgs.length > 0 ? (
              <Carousel imageList={encodedImgs} imType={'EncryptedImg'}/>
            ) : (
              <p>Loading your images...</p>
            )}
          </div>
        </div>
      </div>}
    </div>
  )
}
