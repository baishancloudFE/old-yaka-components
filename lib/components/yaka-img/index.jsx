import React from 'react';

export default ({src='', width, height, style={}, children, ...othProps})=>{
  const realStyle = {
    width: width || '100%',
    height: height || '100%',
  }
  return (
    <img style={realStyle} {...othProps} width={'100%'} height={'100%'} src={src} />
  )
}
