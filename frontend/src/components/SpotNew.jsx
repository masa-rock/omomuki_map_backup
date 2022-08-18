import { Link, useNavigate } from 'react-router-dom';
import { Paper, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import client from "../apis/client";

export const SpotNew = () =>{
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [businessHourStart, setBusinessHourStart] = useState();
  const [businessHourEnd, setBusinessHourEnd] = useState();
  const [fee, setFee] = useState();
  const [stayTime, setStayTime] = useState();
  const [eatWalk, setEatWalk] = useState();
  const [images, setImages] = useState({data: "", name: ""});

  const handleImageSelect = async(e) => {
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file){
      reader.onload = () => {
        setImages({
          data: reader.result,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
  }
  
  const generateParams = () => {
    const newSpotParams = {
      name: name,
      address: address,
      description: description,
      business_hours_Start: businessHourStart,
      business_hours_end: businessHourEnd,
      fee: fee,
      stay_time: stayTime,
      eat_walk: eatWalk,
      images: images
    }
    return newSpotParams
  }

  const handleSpotRegistration = async(e) => {
    e.preventDefault();
    const params = generateParams();
    // const images = e.target.files[0];
    // const reader = new FileReader();
    // console.log(reader)
    // if(images){
    //   reader.onload = () =>{
    //     setImages({
    //       data: reader.result,
    //       name: images[0] ? images[0].name :"unknownfile"
    //     })
    //   }
    //   reader.readAsDataURL(images[0])
    // }

    try{
      client.post('/api/v1/posts',params)
      navigate("/")
    }catch(e){
      console.log(e)
    }
  }

  return(
    <Paper
    sx = {{
      p: "100px",
      width: "400px",
      m: "0 auto"
    }}
    >
    <Typography variant={"h5"} sx={{ m: "30px" }}>
      スポット登録画面
    </Typography>
    <form>
      <div>
        <TextField 
          type="text"
          id= "name"
          label= "スポット名"
          name= "name"
          value= {name}
          fullWidth
          variant = "standard"
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        <TextField 
          type="text"
          id= "address"
          label= "住所"
          name= "address"
          value= {address}
          fullWidth
          variant = "standard"
          onChange={(e) => setAddress(e.target.value)}
        />
        </div>
        <div>
        <TextField 
          type="text"
          id= "description"
          label= "スポットの説明"
          name= "description"
          value= {description}
          fullWidth
          multiline
          rows = {5}
          variant = "standard"
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <Typography align="left" variant={"h6"} sx={{ mt: "70px" }}>
          営業時間
        </Typography>
        <TimeInput>
          <div>
            <label htmlFor="business_hour_start">
              <Typography variant={"h6"} sx={{ mt: "10px" }}>
                開始時間
              </Typography>
            </label>
            <TextField 
              type="time"
              id= "business_hour_start"
              name= "business_hour_start"
              value= {businessHourStart}
              variant = "standard"
              onChange={(e) => setBusinessHourStart(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor="business_hour_end">
            <Typography variant={"h6"} sx={{ mt: "10px" }}>
                終了時間
            </Typography>
            </label>
            <TextField 
              type="time"
              id= "business_hour_end"
              name= "business_hour_end"
              value= {businessHourEnd}
              variant = "standard"
              onChange={(e) => setBusinessHourEnd(e.target.value)}
              />
          </div>
        </TimeInput>
        <div>
          <TextField 
            type="number"
            id= "fee"
            label= "費用"
            name= "fee"
            value= {fee}
            variant = "standard"
            onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div>
          <FormControl style={{minWidth: 200}}>
            <InputLabel id="stay_time">滞在時間</InputLabel>
            <Select
              labelid= "stay_time"
              label= "滞在時間"
              name= "stay_time"
              value= {stayTime}
              onChange={(e) => setStayTime(e.target.value)}
            >
              <MenuItem value={0}></MenuItem>
              <MenuItem value={1}>1時間未満</MenuItem>
              <MenuItem value={2}>1~2時間</MenuItem>
              <MenuItem value={3}>半日</MenuItem>
              <MenuItem value={4}>一日</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControlLabel 
            control={<Checkbox
              value= {eatWalk}
              onChange={(e) => setEatWalk(e.target.value)}
              name= "eat_walk"
            />}
            label= "食べ歩きできるか（できる場合チェック）"
          />
        </div>
      </div>
      
      <Typography variant={"h5"} sx={{ m: "30px" }}>
      画像アップロード
        <input 
        type="file"
        name = "images"
        onChange = {handleImageSelect}
         />
      </Typography>
      <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSpotRegistration(e)}>
        登録する
      </Button>
    </form>
    </Paper>
  )
}

const TimeInput = styled.div`
  display: flex;
  justify-content: space-between;
  color: currentColor;
`
