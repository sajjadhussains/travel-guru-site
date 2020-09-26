import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {

    const mapStyles = {        
        height: "100vh",
        width: "80%"};
      
      const defaultCenter = {
        lat: 23.6850, lng: 90.3563
      }

    return(
        <LoadScript
            googleMapsApiKey='AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={8}
            center={defaultCenter}
            
            />       
        </LoadScript>
    )
}

export default MapContainer;