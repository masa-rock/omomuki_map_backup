import React, { useEffect, useState, useMemo, Component } from "react";
import axios from 'axios';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { positions } from "@mui/system";
import styled from 'styled-components';

export const SearchMap = () => {
  const [spots, setSpots] = useState([])
  const [select, setSelect] = useState("off")
  const [key, setKey] = useState(0)

  useEffect(() => {
      axios.get('http://0.0.0.0:3001/api/v1/posts')
      .then(resp =>{
        setSpots(resp.data);
      })
      .catch(e => {
        console.log(e.response);
      })
    
  },[])
  
  
  const MarkerMap = () =>{
    return(
      spots.map((val) => (
        <>        
          <Marker 
            key={val.id} 
            position={{lat:val.lat, lng:val.lng}}
            onMouseOver={() => {
              setSelect("on")
              setKey(val.id)
            }}
            onMouseOut={() =>{
              setSelect("off")
            }}
            />
            
          {select === "on" && key === val.id?
            <InfoWindow key={val.id} position={{lat:val.lat, lng:val.lng}} options={{pixelOffset: new window.google.maps.Size(0,-40)}} >
                <p>{val.name}</p>
            </InfoWindow>        
          : ""}
        </>
      ))    
    )}

  const defaultProps = {
    zoom: 10
  };

  const HandleCenterChanged = () => {
    
  }

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const center = useMemo(() => ({lat: 35.30486957565305, lng: 136.9142007392334}), []);

  return(
    <LoadScript googleMapsApiKey="AIzaSyAWyQfXaQA7ITensdfjr7MOt081KlrKLec">
      <GoogleMap 
        mapContainerStyle={{ height: '75vh', width: '60%' }} 
        center={center} 
        zoom={defaultProps.zoom}
        onCenterChanged ={HandleCenterChanged}>
        <MarkerMap/>  
       </GoogleMap>
    </LoadScript>
  )
}

const Hover = styled.div`
    margin-left:20px;
`
         