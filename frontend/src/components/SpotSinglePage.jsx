import { useState, useEffect, useContext, createContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../App';
import Review from "./Review";
import { display } from "@mui/system";
import ReactStarsRatings from 'react-awesome-stars-rating';

export const FlagContext = createContext();

export const SpotSinglePage = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState("")
  const [name, setName] = useState()
  const [address, setAddress ] = useState()
  const [description, setDescription] = useState()
  const [stayTime, setStayTime] = useState()
  const [postId, setPostId] = useState([])
  const [img, setImg] = useState([])
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState()
  const [userId, setUserId] = useState()
  const params = useParams();
  const [star, setStar] = useState(0)
  const [images, setImages] = useState({data: "", name: ""});
  const [reviews, setReviews] = useState([])
  const {setIsSignedIn, isSignedIn, currentUser, loading} = useContext(AuthContext);
  const [reviewCount, setReviewCount] = useState(0)
  const [postReview, setPostReview] = useState([])
  const [flag, setFlag] = useState(false);
  const total_review = postReview.length
  const average_review = total_review ? postReview.reduce((sum, i) => sum + i.rate, 0)/total_review : 0 ;
  console.log(postReview)
  const value = {
    reviews,
    setReviews,
    star,
    setStar,
    title,
    setTitle,
    userId,
    post,
    name,
    images,
    setImages,
    postId
  }
  
  useEffect(() => {
    async function fetchData(){
    const getSpot = await axios.get(`http://0.0.0.0:3001/api/v1/posts/${params.id}`)
    const getReviews = await axios.get(`http://0.0.0.0:3001/api/v1/posts/review_data/${params.id}`)
    setPost(getSpot.data.post)
    setPostId(getSpot.data.post.id)
    setName(getSpot.data.post.name)
    setAddress(getSpot.data.post.address)
    setDescription(getSpot.data.post.description)
    setStayTime(getSpot.data.post.stay_time)
    setImg(getSpot.data.post.image_url)
    setTags(getSpot.data.post.tags)
    setUserId(currentUser?.id)
    setReviews(getReviews.data)
    setPostReview(getSpot.data.post.review)
    // setReview(getSpot.data.reviews)
  }
  fetchData()
},[])

  const DisplayImg = () =>{
    const display_img =  img.length != 0 ? img : `${process.env.PUBLIC_URL}/noimg.jpg`
    return(
      <img src = {display_img} />
    )
  }

  const dataDelete = (delete_id) => {
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

  const generateParams = (data) => {
    const tag_param = [data]
    const select_tag = {
      tags: tag_param
    }
    return select_tag
  }

  const toTagPage = (data) => {
    const params = generateParams(data)
    navigate(`/spot/list`, {state: {params: params}})
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

  console.log(average_review)

  return(
    <SinglePageContainer>
      <SingleSpotTitle>
        {name}      
        <ReactStarsRatings value={average_review} />
        <span> { average_review } </span>
        ({ total_review })
      </SingleSpotTitle>
      <SinglePageMain>
        <ImageContainer>
          <DisplayImg/>
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
                <CheckBoxButton onClick={() => toTagPage(data.id)}>
                  {data.name}
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
      <FlagContext.Provider value={value} >
        <Review/>
      </FlagContext.Provider>
    </SinglePageContainer>
  )
}

const SinglePageContainer = styled.div`
  background-color: #fff;
  max-width: 1800px;
  margin: 100px auto;
  padding: 100px;
  color: black;
  border-radius: 20px;
`

const SingleSpotTitle = styled.div`
  font-size: 38px;
  text-align: left;
  margin-left: 20px;
  &&& span{
    color: red;    
  } 
`

const SinglePageTitle = styled.h3`
  font-size: 38px;
  text-align: left;
`

const ImageContainer = styled.div`
  width: 50%;
  &&& img{
    width: 100%;
    border-radius:10px;
  }
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
