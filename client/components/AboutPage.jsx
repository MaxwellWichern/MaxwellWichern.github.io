import React from 'react'
import { getSomething, addSomething, deleteSomething, getById, deleteByName } from '../routeToServer.js'

export default function AboutPage(props) {

  const derekTestFunction = (e) => {

    const user = {
      userName: "createdelme",
      userPw: "ehh",
      email: "menu"
    }

    getSomething();

    addSomething(user, "name");

    getSomething();


  }



  return (
    <div>
      <h1>Welcome!</h1>
      <h3>This is the Steganography Encoder and Decoder!</h3>
      <p>Navigate this page to visit the encoder and decoder where you can use Steganography to hide a message inside an image or pull one from an image!</p>

      <div><input type="submit" id="derekTestButt" onClick={derekTestFunction} value="Test Booten" /></div>



      {/* Welcome: Introduce the page :
      Introduce as a capstone project and the purpose of the page :
      Group Members ? :
      About the Interactions :
      Link to other Pages? ex; 'get started' button links to instructions
      LoGo!!!!
       */}

    </div>


  )
}
