import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MyComponent({ longitude, latitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API
  })

  const [map, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat:latitude,lng:longitude}}
        zoom={8}
        onUnmount={onUnmount}
      >
          <Marker position={{lat:latitude,lng:longitude}}/>
      </GoogleMap>
  ) : <></>
}

export default MyComponent