import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React from 'react'

const Map = () => {
 const style = {
        width :"100%",
        height:"400px"
    }
    const pin ={
        lat:9.494117131370764,
        lng:77.69421279430391
    }
  return (
    <>
    <LoadScript googleMapsApiKey='AIzaSyBPFSx665znvsp73vkTZm0dRssaBU0JaqA'>
        <GoogleMap mapContainerStyle={style} center={pin} zoom={12}>
            <Marker position= {pin} />
        </GoogleMap>
    </LoadScript>
    </>
  )
}

export default Map