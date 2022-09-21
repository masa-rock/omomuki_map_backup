import styled from 'styled-components';
import { TextField, CardHeader, Card } from "@material-ui/core";
import ReactStarsRatings from 'react-awesome-stars-rating';
import { Typography } from "@mui/material";
import Button from '@material-ui/core/Button';
import { useState, useEffect, useContext } from "react";
import { CardMedia } from "@mui/material";
import {useModal} from 'react-hooks-use-modal';
import { AuthContext } from '../App';
import { FlagContext } from './SpotSinglePage'
import client from "../apis/client";
import { useParams, useNavigate } from 'react-router-dom';

const Review = () => {
  const {setIsSignedIn, isSignedIn, currentUser, loading} = useContext(AuthContext);  
  const navigate = useNavigate()
  const value = useContext(FlagContext);
  const [assessment, setAssessment] = useState()

  const DoReview = () => {
    if (!loading){
      if (isSignedIn){
        return(
          <ModalButton onClick={open}>
            投稿する
          </ModalButton>
        )
      } else{
        return(
          <>
          <p>※レビューを投稿する場合は、ログインしてください</p>
          </>
        )
      }}
  }

  const onChange = (value) => {
    value.setStar(value);
  }

  const [Modal, open, close, isOpen] = useModal('root',{
    preventScroll: true
  })

  const handleSpotRegistration = async(e) => {
    e.preventDefault();
    const params = await generateParams();
    try{
      client.post('/api/v1/reviews', params)
      navigate(-1)
    }catch(e){
      console.log(e)
    }
  }

  const handleImageSelect = async(e) => {
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file){
      reader.onload = () => {
        value.setImages({
          data: reader.result,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
    return ;
  }

  const DisplayImg = (img) =>{
    console.log(img)
    const display_img =  img.length != 0 ? img : `${process.env.PUBLIC_URL}/noimg.jpg`
    return display_img
}

  const ReviewCardImg = (img) => {
    const display_img =  img.img.length != 0 ? img : `${process.env.PUBLIC_URL}/noimg.jpg`
    console.log(display_img)
    return(
      <img src = {display_img} />
    )
  }

  const generateParams = () => {
    const reviewParams = {
      title: value.title,
      comment: value.reviews,
      rate: value.star,
      user_id: value.userId,
      post_id: value.post.id,
      images: value.images
    }
    return reviewParams
  }

  return (
  <>
    <ReviewTitleContainer>
      <SinglePageTitle>
        レビュー
      </SinglePageTitle>
      <DoReview/>
    </ReviewTitleContainer>
    <ReviewIndex>
      { value.reviews.map((key) => {
        return(
          <Card className = {"spot-list-card review-container"}>
            {console.log(key.image_url)}
            {/* <ReviewCardImg img = {key.image_url}/> */}
            <CardMedia
              component = "img"
              image = { DisplayImg(key.image_url) }
              height = "200"
              />
            <ReviewMainContainer>
                <h3> { key.user.name } </h3>
              <ReviewMain>
                <div>
                  <h3> { key.title } </h3>
                </div>
                <ReviewMainRight>
                  <ReactStarsRatings value={key.rate} />
                  <span>{key.rate}</span>
                </ReviewMainRight>
              </ReviewMain>
              <p>{key.comment}</p>
            </ReviewMainContainer>
          </Card>
        )
      })}
    </ReviewIndex>
    <Modal>
      <ModalStyle>
        <form>
          <SingleSpotTitle>"{value.name}"のレビューを追加する</SingleSpotTitle>
          <Assessment>
            <SingleSpotTitle>評価</SingleSpotTitle>
            <ReactStarsRatings 
              onChange={(e) => {
                value.setStar(e.target.value)
              }} 
              value={value.star} />
            <TextField
              type = "number"
              value = {value.star}
              inputProps = {{ step: 0.1, max: 5, min: 0 }}
              onChange = {(e) => {
                value.setStar(e.target.value)
              }}
            />
          </Assessment>              
          <TextField 
            type="text"
            id= "title"
            label = "タイトルを入れてください"
            name= "title"
            value= {value.title}
            fullWidth
            variant = "standard"
            onChange={(e) => value.setTitle(e.target.value)}
          />
          <TextField 
            type="text"
            id= "review"
            label= "レビュー内容を入れてください"
            name= "review"
            value= { value.reviews }
            fullWidth
            multiline
            rows = {15}
            variant = "standard"
            onChange={(e) => value.setReviews(e.target.value)}
          />
          <Typography variant={"h5"} sx={{ mt: "30px" }}>
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
      </ModalStyle>
    </Modal>
  </>
  )
}

export default Review;

const ReviewTitleContainer = styled.div`
  display: flex;
  align-items: center;
`
const SinglePageTitle = styled.h3`
  font-size: 38px;
  text-align: left;
`

const SingleSpotTitle = styled.h3`
  font-size: 38px;
  text-align: left;
`

const ModalButton = styled.button`
  margin-left: 50px;
  &:hover{
    cursor: pointer;
  }
`

const ModalStyle = styled.div`
  background-color: #fff;
  width: 800px;
  height: 800px;
  padding: 60px 100px;
  border-radius: 10px;
`

const Assessment = styled.div`
  display: flex;
  align-items: center;
  &&& h3{
    margin-right: 20px;
  }
`

const ReviewIndex = styled.div`
  width: 80%;
`
const ReviewMainContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  &&& span{
    text-align: left;
  }
  &&& h3{
    text-align: right;
    margin: 5px;
  }
  &&& p{
    text-align: left;
    margin: 10px;
  }
`

const ReviewMain = styled.div`
  display: flex;
  height: 15%;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #eeece4;
  &&& div{
    display: flex;
  }
`

const ReviewMainRight = styled.div`
  &&& span{
    font-size: 22px;
    padding-left: 5px;
    font-weight: bold;
    color: red;
  }
`
