import React, { useState } from 'react'

export const LazyImage = ({images,alt}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  }; 
  const containerStyle = {
    backgroundImage: `url('${images}')`,
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.5s ease',
  }
  return (
    <div className='w-full h-full' style={containerStyle}>
        <img className='aspect-square' src={images} alt={alt} loading='lazy' onLoad={handleImageLoad} />
    </div>
  )
}
