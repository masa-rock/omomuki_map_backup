import styled from 'styled-components';
import {Sidebar} from './Sidebar';
import { useState, useEffect, useContext } from "react";
import { Grid, CardHeader, Card, CardMedia } from "@material-ui/core";
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from 'axios';

export const WantToGo = () => {
  const [post, setPost] = useState([])
  const {setIsSignedIn, isSignedIn, currentUser, loading} = useContext(AuthContext);
  const noImg = `${process.env.PUBLIC_URL}/noimg.jpg`
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://0.0.0.0:3001/api/v1/want_to_goes", {params: {user_id: currentUser.id}})
    .then(resp => {
      console.log(resp)
      setPost(resp.data.posts)
    })
    .catch(e => {
      console.log(e.response)
    })
  },[currentUser])

  const ToSinglePage = (id) => {
    navigate(`/spot/${id}`,{id: id})
  }

  const DisplayImg = (img) =>{
    console.log(img)
    const display_img =  img.length != 0 ? img : noImg
    return display_img
}

  const WantToGoComponent = (prop) =>{
    console.log(prop.val)
    return(
      <Card onClick={() => ToSinglePage(prop.val.id)} className = {"want-to-go-card"}>        
        <CardMedia
          component = "img"
          image = { DisplayImg(prop.val.image_url) }
          height = "200"
        />
        <div className = {"want-to-go-right-text"}>
          <p>{prop.val.name}</p>
        </div>
      </Card>
    )
  }

  return(
    <>
    <MyPageContainer>
      <SideBarContainer>
        <Sidebar/>
      </SideBarContainer>
      <MainContainer>
        <h4>行きたい場所一覧</h4>
        {post?.map((val) => {
          return(
            <>              
              <WantToGoComponent val = {val}/>
            </>
          )
        })}
      </MainContainer>
    </MyPageContainer>
    </>
  )
}

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;
  `
  
  const SideBarContainer = styled.div`
  width: 200px;
  background-color: #2d445d;
  padding-top: 80px;
`

const MainContainer = styled.div`
  background-color: #f5f5f5;
  width: calc(100% - 200px);
  padding-top: 100px;
  &&& h4{
    font-family: 'Shippori Mincho', serif;
    font-size: 30px;
  }
`
