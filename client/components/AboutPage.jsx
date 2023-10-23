import React from 'react'
import {getSomething,deleteSomething,getById} from '../routeToServer.js'

export default function AboutPage(props) { 

  const derekTestFunction = (e) => { 

//deleteSomething(123456789);
getById(123456888);
 
getSomething();


} 



  return (
    <div>
      <h1>Welcome!</h1>
      <h3>This is the Steganography Encoder and Decoder!</h3>
      <p>Navigate this page to visit the encoder and decoder where you can use Steganography to hide a message inside an image or pull one from an image!</p>
      <div><input type="submit" id="derekTestButt" onClick={derekTestFunction} value="Test Booten"/></div>
    
    </div>
    

  )
}
