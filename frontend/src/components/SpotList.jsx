import { useState, useEffect } from "react";
import axios from 'axios';
import {Grid, CardHeader, Card} from "@material-ui/core";
import {CardMedia} from "@mui/material";

export const SpotList = () => {
  const [spots, setSpots] = useState([])
  const [searchName, setSearchName] = useState('') 
  useEffect(() => {
    axios.get('http://0.0.0.0:3001/api/v1/posts')
    // ,{headers: { "Accept": "application/json", "Content-Type": "application/json", "Access-control-allow-origin": "*" } })
    .then(resp => {
      console.log(resp)
      setSpots(resp.data);
    })
    .catch( e => {      
      console.log(e.response);
      console.log("hoge");
      })
  },[])

  const DisplayImg = (img) =>{
      if(img){
        return <img src={img} />
      }else{
        return <></>
      }
  }

  return(
    <>
      <h3>spotリスト</h3>
      <Grid container spacing={1}>
        {spots.map((val) => {
        return(  
          <Grid item xs={3} >
            <Card>
              <CardHeader
                title = { val.name }
              />
              <CardMedia
              component = "img"
              image = {val.image_url}
              height = "200"
              />
            </Card>
            {/* {val.image_url}
            < DisplayImg img = {val.image_url} /> */}
          </Grid>  
        )
        })}
      </Grid>
    </>
  )
}
