import { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, CardHeader, Card } from "@material-ui/core";
import { CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ReactStarsRatings from 'react-awesome-stars-rating';
import '../Pagination.css'
import '../Spot.css'
import styled from 'styled-components';

export const SpotList = () => {
  const [spots, setSpots] = useState([])
  const [count, setCount] = useState(0)
  const [keyword, setKeyword] = useState([])
  const [tag, setTag] = useState([])
  const [allTag, setAllTag] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const searchparams = location.state.params
  const [ offset, setOffset ] = useState(0);
  const perPage = 8;
  const noImg = `${process.env.PUBLIC_URL}/noimg.jpg`

  const handlePageChange = (data) => {
    let page_number = data['selected'];
    setOffset(page_number*perPage)
  }

  useEffect(() => {
    console.log(searchparams)
    axios.get('http://0.0.0.0:3001/api/v1/tag')
    .then(resp => {
      setAllTag(resp.data)
    })
    .catch( e => {
      console.log(e.response);
    })
    axios.get('http://0.0.0.0:3001/api/v1/posts', {params: searchparams})
    .then(resp => {
      setSpots(resp.data.posts);
      setCount(resp.data.posts.length);
      setKeyword(searchparams.keyword);
      setTag(searchparams.tags);      
    })
    .catch( e => {
      console.log(e.response);
    })
  },[])

  const DisplayImg = (img) =>{
      console.log(img)
      const display_img =  img.length != 0 ? img : noImg
      return display_img
  }

  const toTagPage = (data) => {
    navigate(`/spot/list`, {state: {tags: data}})
  }

  const ToSinglePage = (id) => {
    navigate(`/spot/${id}`,{id: id})
  }

  const StarRating = (prop) => {
    const total_review = prop.review.length
    const average_review = prop.review.reduce((sum, i) => sum + i.rate, 0)/total_review;
    const average_review_result = average_review ? average_review : 0
    return (
      <>
        <ReactStarsRatings value={average_review_result} />
        <span> { average_review_result.toFixed(2) } </span>
        <span> ({ total_review }) </span>
      </>
    )
  }

  const TagDisplay = () => {
    const tag_names = []    
    allTag.map((t) => {
      console.log(t.id)
      if( tag.includes(t.id.toString()) ){
        console.log('goog')
        tag_names.push(t.name)
      }
    })
    return(
      <p>?????????{tag_names ? tag_names.join(', ') : ""}</p>
    )
  }

  return(
    <>
      <h3>spot?????????</h3>
      <p>{keyword ? `??????????????????${keyword}`:``}</p>
      <p>???????????????{count}??????????????????????????????</p>      
      <TagDisplay/>
      <Grid container spacing={3}>
        {spots.slice(offset, offset+ perPage).map((val) => {
        return(  
          <Grid item xs={3}>
            <Card onClick={() => ToSinglePage(val.id)} className = {"spot-list-card"}>              
              {console.log(val.tags)}
              <span>{ val.name }</span>
              <CardMedia
              component = "img"
              image = { DisplayImg(val.image_url) }
              height = "200"
              />
              <StarRating review = { val.review }/>
              <SinglePageTags>{ val.tags.map((data) => {
              {console.log(data)}
              return(
                <CheckBoxButton onClick={() => toTagPage(data.name)}>
                  {data.name}
                </CheckBoxButton>
              )
            }) }</SinglePageTags>
            </Card>
          </Grid>  
        )
        })}
      </Grid>
      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel='...'
        pageCount={Math.ceil(spots.length/perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={ "pagination" }
        // subContainerClassName={ pagination }
        previousClassName='page-item' // '<'????????????(li)???????????????
        nextClassName='page-item' //'>'????????????(li)???????????????
        activeClassName={ "active" }
        // disabledClassName={ pagination_disabled } // ??????????????????<,>????????????????????????
        // pageClassName='page-item'
        // pageLinkClassName='page-link'
        // previousLinkClassName='page-link'  //'<'???????????????????????????
        // nextLinkClassName='page-link'//'>'???????????????????????????
        // breakClassName='page-item' // ?????????????????????????????????
        // breakLinkClassName='page-link' // ????????????????????????????????????????????????
      />
    </>
  )
}

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
