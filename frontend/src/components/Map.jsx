import React, { useEffect, useState, Component } from "react";
import GoogleMapReact from "google-map-react";
import { LoadScript } from '@react-google-maps/api';

export const SimpleMap = () =>  {
  const [place,setPlace] = useState();
  const [lat,setLat] = useState("");
  const [lng,setLng] = useState("");

  const changeLocationName = (event) => {
    if (event.key === 'Enter') {
      geocode();
      return;
    }
    setPlace(event.target.value)
  }

  function geocode() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === 'OK') {
        setLat(results[0].geometry.location.lat())
        setLng(results[0].geometry.location.lng());
      }
    });
  }

  return (
     <React.Fragment>
        <div>
           <input type="text" 
             onChange={(event) => changeLocationName(event)} 
             onKeyPress={(event) => changeLocationName(event)}
           />
           <LoadScript googleMapsApiKey='AIzaSyAWyQfXaQA7ITensdfjr7MOt081KlrKLec'>
           </LoadScript>
                                          <p>緯度：{lat}</p>
                                          <p>緯度：{lng}</p>
       </div>
     </React.Fragment>
  );
}

// export default SimpleMap;
