import React, { useState, useEffect } from 'react'
import CardImage from './components/card_image/CardImage'
import './App.css'

function App() {
  const [fetchedImageURL, setFetchedImageURL] = useState('')

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
        const imgURL = response.message

        setFetchedImageURL(imgURL)
      } catch(error) {
        console.log('Error fetching image - ', error)
      }
    }

    fetchImage()
  }, [])

  return (
    <div className="App">
      <CardImage
        imageURL={fetchedImageURL}
        description="Esse seria um texto para descrever alguma coisa sobre a raça desse dog"
      />
    </div>
  );
}

export default App;
