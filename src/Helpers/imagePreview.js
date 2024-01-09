import React, { useEffect } from 'react';

export default function ImagePreview({ icon }) {
  useEffect(() => {
    if (!icon) {
      return () => {}; // No cleanup needed if there is no icon
    }
    if(!(icon instanceof File)){
      return <img className='object-contain w-full h-full' src={icon} alt="Preview" />
    }
    const url = URL.createObjectURL(icon);

    // Cleanup function to revoke the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [icon]);

  if (!icon) {
    return null;
  }

  return <img className='object-contain w-full h-full' src={URL.createObjectURL(icon)} alt="Preview" />;
}
