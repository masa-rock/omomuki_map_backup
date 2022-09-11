import { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, CardHeader, Card } from "@material-ui/core";
import { CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"

export const SpotList = () => {
  const [spots, setSpots] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const searchparams = location.state.params
  
  useEffect(() => {
    console.log(searchparams)
    axios.get('http://0.0.0.0:3001/api/v1/posts', {params: searchparams})
    .then(resp => {
      console.log(resp)
      setSpots(resp.data);
    })
    .catch( e => {
      console.log(e.response);
      })
  },[])

  const DisplayImg = (img) =>{
      if(img){
        return <img src={img} />
      }else{
        return <></>
      }
  }

  const ToSinglePage = (id) => {
    navigate(`/spot/${id}`,{id: id})
  }

  return(
    <>
      <h3>spotリスト</h3>
      {}
      <Grid container spacing={1}>
        {spots.map((val) => {
        return(  
          <Grid item xs={3}>
            <Card onClick={() => ToSinglePage(val.id)}>
              <CardHeader
                title = { val.name }
              />
              <CardMedia
              component = "img"
              image = {val.image_url}
              height = "200"
              />
            </Card>
          </Grid>  
        )
        })}
      </Grid>
    </>
  )
}
