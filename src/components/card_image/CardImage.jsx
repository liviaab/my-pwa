import React from 'react'
import './CardImage.css'

const CardImage = ({imageURL, description}) => (
  <div className="card-image-container">
    <img src={imageURL} alt="Imagem de um cachorro" />
    <div className="description">
      {description}
    </div>
  </div>
)

export default CardImage
