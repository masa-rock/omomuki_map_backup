import styled from 'styled-components';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Grid, CardHeader, Card } from "@material-ui/core";
import { CardMedia } from "@mui/material";
import { Rating } from "@mui/material";
import noimg from "../images/noimg.jpg"

import  'swiper/css';
import  'swiper/css/navigation';
import  'swiper/css/pagination';

export const AssessmentSection = () => {
  const [spots, setSpots] = useState([])
  useEffect(() => {
    axios.get("http://0.0.0.0:3001/api/v1/posts")
    .then(resp =>{
      setSpots(resp.data.posts);
    })
    .catch(e => {
      console.log(e.response);
    })    
  },[])

    const DisplayImg = (img) =>{
      const display_img =  img.img != 0 ? img.img : noimg
      return(
        <img src = {display_img} />
      )
    }

    const StarRating = (props) => {
      const total_review = props.props.length
      const average_review = props.props.reduce((sum, i) => sum + i.rate, 0)/total_review;
      const average_review_result = average_review ? average_review : 0
      return (
        <div>
          <Rating
           value={average_review_result}
           precision = {0.1}
            />
          <span> { average_review_result.toFixed(2) } </span>
          <span> ({ total_review }) </span>
        </div>
      )
    }

  return(
    <>
      <AssessmentContainer>
        <AssessmentContainerTitle>口コミ人気スポット</AssessmentContainerTitle>
        <SwiperContainer>
          <Swiper
            modules = {[Navigation, Pagination, Autoplay]}
            navigation
            autoplay = {{
              delay:5000
            }}
            pagination ={{ 
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true 
            }}
          >
            {spots.map((val) => (
              <SwiperSlide>
                <SwiperTitle>
                  <div>{val.name}</div>
                  {/* <div></div> */}
                  <StarRating
                    props = { val.review }
                  />
                </SwiperTitle>
                <div><DisplayImg img={val.image_url}/></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </AssessmentContainer>
    </>
  )
}

const AssessmentContainer = styled.div`
  height: 500px;
  width: 600px;
  margin: 100px auto;
`

const AssessmentContainerTitle = styled.h5`
  font-family: 'Shippori Mincho', serif;
  font-size: 30px;
  border-bottom: solid 1px ;
`

const SwiperTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
`

const SwiperContainer = styled.div`
  margin: 20px 0;
  height: 100%;
  &&& img{
    object-fit: cover;
    width: 100%;
    height: 400px;
  }
`
