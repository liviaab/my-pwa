import React, { useState, useEffect } from 'react'
import CardImage from './components/card_image/CardImage'
import './App.css'
import loadingImg from './images/loading.gif'
import sadDogImg from './images/sad-dog.png'

function App() {
  const [fetchedImageURL, setFetchedImageURL] = useState(loadingImg)

  const fetchImage = async () => {
      setFetchedImageURL(loadingImg)
      setTimeout(async () => {
        try {
          let response = await fetch('https://dog.ceo/api/breeds/image/random')
          response = await response.json()
          const imgURL = response.message
          setFetchedImageURL(imgURL)
        } catch(error) {
          console.log('Error fetching image - ', error)
          setFetchedImageURL(sadDogImg)
          alert("Sorry, we could not fetch image")
        }
      }, 500)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="App">
      <CardImage
        imageURL={fetchedImageURL}
        description="Click the button and wait 0.5s to see a new doggo <3"
      />
      <button type="button" onClick={fetchImage}>Get new image!</button>
    </div>
  );
}

export default App;
