import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
// import client from "../apis/client";
import Button from '@material-ui/core/Button';
import { Typography } from "@mui/material";
import {useModal} from 'react-hooks-use-modal';
import ReactStarsRatings from 'react-awesome-stars-rating';
import { TextField } from "@material-ui/core";
import { AuthContext } from '../App';
import client from "../apis/client";

export const SpotSinglePage = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState()
  const [name, setName] = useState()
  const [address, setAddress ] = useState()
  const [description, setDescription] = useState()
  const [stayTime, setStayTime] = useState()
  const [img, setImg] = useState()
  const [tags, setTags] = useState([])
  const [postId, setPostId] = useState([])
  const [title, setTitle] = useState()
  const [userId, setUserId] = useState()
  const params = useParams();
  const [star, setStar] = useState(0)
  const [images, setImages] = useState({data: "", name: ""});
  const [review, setReview] = useState()
  const {setIsSignedIn, isSignedIn, currentUser, loading} = useContext(AuthContext);
  
  useEffect(() => {
    async function fetchData(){
    const getSpot = await axios.get(`http://0.0.0.0:3001/api/v1/posts/${params.id}`)
    setPost(getSpot)
    setName(getSpot.data.post.name)
    setAddress(getSpot.data.post.address)
    setDescription(getSpot.data.post.description)
    setStayTime(getSpot.data.post.stay_time)
    setImg(getSpot.data.post.image_url)
    setTags(getSpot.data.tag_names)
    setPostId(getSpot.data.post.id)
    setUserId(currentUser?.id)
  }
  fetchData()
},[])


  const [Modal, open, close, isOpen] = useModal('root',{
    preventScroll: true
  })

  const dataDelete = (delete_id) =>{
    if (window.confirm("投稿を削除しますがよろしいですか")){
      axios.delete(`http://0.0.0.0:3001/api/v1/posts/${delete_id}`)
      .then(
        navigate("/spot/list")
      )
      .catch(e => {
        console.log(e.response);
      })
    }
  }

  const toTagPage = (data) => {
    navigate(`/spot/list`, {state: {tags: data}})
  }

  const Stay = () =>{
    const stay_time ={
      "1": "1時間未満",
      "2": "1~2時間",
      "3": "半日",
      "4": "一日"
    }
    return (
      <>
        {stay_time[stayTime]}
      </>
    )
  }

  const onChange = (value) => {
    setStar(value);
  }

  const generateParams = () => {
    const reviewParams = {
      title: title,
      comment: review,
      rate: star,
      user_id: userId,
      post_id: postId,
      images: images
    }
    return reviewParams
  }

  const handleSpotRegistration = async(e) => {
    e.preventDefault();
    const params = await generateParams();
    console.log(params);
    console.log(images);
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
        setImages({
          data: reader.result,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
    return ;
  }

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

  return(
    <>
      <SinglePageContainer>
        <SingleSpotTitle>{name}</SingleSpotTitle>
        <SinglePageMain>
          <ImageContainer>
            <img src={img} />
          </ImageContainer>
          <SinglePageRightContainer>
            <SpotContents>
              <SinglePageSubject>住所</SinglePageSubject>
              <SinglePageText><p>{address}</p></SinglePageText>
            </SpotContents>
            <SpotContents>
              <SinglePageSubject>タグ</SinglePageSubject>
              <SinglePageTags>{ tags.map((data) => {
                return(
                  <CheckBoxButton onClick={() => toTagPage(data)}>
                    {data}
                  </CheckBoxButton>
                )
              }) }</SinglePageTags>
            </SpotContents>
            <SpotContents>
              <SinglePageSubject>滞在時間</SinglePageSubject>
              <SinglePageText><p><Stay/></p></SinglePageText>
            </SpotContents>
            <SpotContents>
              <SinglePageSubject>場所の説明</SinglePageSubject>
              <SinglePageText><p>{description}</p></SinglePageText>
            </SpotContents>
            <Button onClick={() => dataDelete(postId)}>
              削除
            </Button>
            <Button onClick={() => { navigate(-1) }}>一覧ページに戻る</Button>
          </SinglePageRightContainer>
        </SinglePageMain>
        <SinglePageTitle>
          投稿写真
        </SinglePageTitle>
        <ReviewTitleContainer>
          <SinglePageTitle>
            レビュー
          </SinglePageTitle>
          <DoReview/>
          <Modal>
            <ModalStyle>
              <form>
                <SingleSpotTitle>"{name}"のレビューを追加する</SingleSpotTitle>
                <Assessment>
                  <SingleSpotTitle>評価</SingleSpotTitle>
                  <ReactStarsRatings onChange={onChange} value={star} />
                  <TextField
                    type = "number"
                    value = {star}
                    inputProps = {{ step: 0.1, max: 5, min: 0 }}
                    onChange = {(e) => {
                      setStar(e.target.value)
                    }}
                  />
                </Assessment>              
                <TextField 
                  type="text"
                  id= "title"
                  label = "タイトルを入れてください"
                  name= "title"
                  value= {title}
                  fullWidth
                  variant = "standard"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField 
                  type="text"
                  id= "review"
                  label= "レビュー内容を入れてください"
                  name= "review"
                  value= {review}
                  fullWidth
                  multiline
                  rows = {15}
                  variant = "standard"
                  onChange={(e) => setReview(e.target.value)}
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
        </ReviewTitleContainer>
      </SinglePageContainer>
    </>
  )
}

const SingleSpotTitle = styled.h3`
  font-size: 38px;
  text-align: left;
`

const SinglePageTitle = styled.h3`
  font-size: 38px;
  text-align: left;
`

const SinglePageContainer = styled.div`
  background-color: #fff;
  max-width: 1800px;
  margin: 100px auto;
  padding: 100px;
  color: black;
  border-radius: 20px;
`

const ImageContainer = styled.div`
  width: 50%;
  &&& img{
    width: 100%;
    border-radius:10px;
  }
`

const ReviewTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const SinglePageMain = styled.div`
  display: flex;
`

const SinglePageRightContainer = styled.div`
  padding: 50px;
  width:50%;
`

const SinglePageSubject = styled.dt`
  font-size: 20px;
  width: 30%;
  text-align: left;
`

const SpotContents = styled.dl`
  display: flex;
  border-bottom: solid 1px #ccc;
  align-items: center;
  margin-bottom: 50px;
  padding: 10px 0;
`

const SinglePageText = styled.dd`
  width: 70%;
  text-align: left;
`

const SinglePageTags = styled.dd`
  width: 70%;
  text-align: left;
  display: flex;
`
const CheckBoxButton = styled.div`
  font-size:16px;
  cursor: pointer;
  color: #3f51b5;
  border:1px solid #3f51b5;
  padding: 5px;
  border-radius:3px;
  margin:2px;
  &:hover{
    color: #fff;
    background-color: #3f51b5;
    transition: 0.5s;
  }
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
