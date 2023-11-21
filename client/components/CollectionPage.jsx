import React from 'react'
import { CredentialsContext } from './App'
import { Carousel } from 'bootstrap'

const stockImgStyle = {
  border: 'solid 6px',
  margin: '6px',
  borderRadius: '20%',
  cursor: 'pointer',
}

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

  function justLoaded(e) {
    const width = e.target.style.width
    const height = e.target.style.height
    //console.log(width)
    //console.log(height)
    if (width > height)
      (width > 300) ? (e.target.style.width = '300px') : (e.target.style.width = width)
    else
      (height > 300) ? (e.target.style.height = '300px') : (e.target.style.height = height)
  }

  const mouseEntered = (e) => {
    e.target.style.borderColor = 'red'
  }

  const mouseLeft = (e) => {
    e.target.style.borderColor = 'black'
  }

  return(
    <div>
      <div>
        <h2>
          Original Images
        </h2>
        <div id='originalSet'>
        <div>
            {historyImgs && historyImgs.length > 0 ? (
              <Carousel>

                  {historyImgs.map((img) => (
                    <Carousel.Item>
                        <img key={img} onLoad={(e)=>{justLoaded(e)}} style={stockImgStyle}
                          src={img}
                          className="img-fluid d-block w-100"
                          onMouseEnter={(e)=>{mouseEntered(e)}}
                          onMouseLeave={(e)=>{mouseLeft(e)}}
                          //onClick={(e)=>{mouseClicked(e)}}
                        />
                    </Carousel.Item>
                  ))}
              </Carousel>
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
              <div className='carousel slide'>
                <div className='carousel-inner'>
                  {encodedImgs.map((img) => (
                    <div key={img} className='carousel-item'>
                        <img onLoad={(e)=>{justLoaded(e)}} style={stockImgStyle}
                          src={img}
                          className="img-fluid"
                          onMouseEnter={(e)=>{mouseEntered(e)}}
                          onMouseLeave={(e)=>{mouseLeft(e)}}
                          //onClick={(e)=>{mouseClicked(e)}}
                        />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            ) : (
              <p>Loading your images...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
