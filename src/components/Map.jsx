import React from 'react'
import { GoogleMap, useJsApiLoader, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '30%',
  height: '400px'
};

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
}

function Map({ longitude, latitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API
  })

  const [, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat:parseInt(latitude),lng:parseInt(longitude)}}
        zoom={8}
        onUnmount={onUnmount}
      >
          <Circle options={options} center={{lat:parseInt(latitude),lng:parseInt(longitude)}} />
      </GoogleMap>
  ) : <></>
}

export default Map