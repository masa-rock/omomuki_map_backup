import { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, CardHeader, Card } from "@material-ui/core";
import { CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../Pagination.css'
import '../Spot.css'
import styled from 'styled-components';

export const SpotList = () => {
  const [spots, setSpots] = useState([])
  const [count, setCount] = useState(0)
  const [keyword, setKeyword] = useState([])
  const [tags, setTags] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const searchparams = location.state.params
  const [ offset, setOffset ] = useState(0);
  const perPage = 5;
  const noImg = "https://mapappbucket.s3.ap-northeast-1.amazonaws.com/f86wkh5226yuxvcfcqxb237bofom?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaDmFwLW5vcnRoZWFzdC0xIkYwRAIgN624HFPiwqg6NNCuX4c4dAwU%2F4u2%2Buq8WCxpV03p590CIB8pj8sbbVO%2FysbtiO%2BMlG2uKlVuX8aOlvj4ZtGQxN19Ku0CCNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDg2NjQyMzQyMjk1IgxuvEyGoJn8LnX7Qn8qwQId8w9A06VHM7mgpyrhnxsfJKzDj9hnV4JSks5ukCsy24F5Y8cVXmd7JuT6uiqte4NIe744yeMjKS8nYXCD%2B35cHtMqH9KcsMh8Q4CqJhSQgzVKWCerewW4JrUK9hmFyRARDBW9Xc9BiZxsiey7Z6MA57iSdTEigXDj8W49t9MYygoZtSe0owmwQMoIpUla9ZAsmE3SC8kbuozOpwWK10ARxH%2B3h%2BTd2n2pEfgv%2BoodpWJiOqDsd6S6cc6xJ2KnX6tzov%2B6oWvLH7SrEkVOUnQoN84%2F1v17igSYHoe00XPnC7Ch2lth9pvJr85aU9DgrLl86n3j474iuUjy61VxKHfkjfdkCrz8RKw5%2BNrrB2eE32H2%2BNoCbffsTbalY5ENuqGnZBE91ji%2FjxgSdLHYsRL0eLf0Vp84bvc6TAqah09MmP0w3riMmQY6tAI%2F1jdvCMAE6yE6N3yZXBHlqiQ9E1y2iRVs5h4NVcscyzZCYK9DGUFGf7OJuZIHu%2FF%2FjBqdeqf2b7GtQlmwd84QfMAcu75R%2FaDFM1wIDWFyEGRfG4sI2MR%2B7iYFTeV%2B6G0pzplDD%2FjVsmzbOk13iJbCrjdIInqcRMwLBTee5vg%2F98pJIotyScb8OrxecV6BbJ2YqrDhm9GIJapYmTw87302x9qWvmTOUKHdziwBSC%2BBwLOYk6z4NT2HkMuRPBTl%2FiqsoxUpwkjZC%2FbzXUzK%2FgPJpGzyjpzYp456Vnv5nfJo%2BwtV4B3JnAdx%2F9Ii8djPRDJxOgmGFoQgT5fPMx1PUt8tJd0ro1cmrSLh3N3xHEoujfSBflUXF5vc%2FHG0JOx1zjKzhUwFPyocqf2YfDjlqz%2BBhZXSFA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220915T123903Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARILCJHGLVVPCZXF3%2F20220915%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Signature=e154acdf4067d8c1421b874560be35aef9b5d2a78c2dc3d75c611a08a6772ec3";

  const handlePageChange = (data) => {
    let page_number = data['selected'];
    setOffset(page_number*perPage)
  }

  useEffect(() => {
    console.log(searchparams)
    axios.get('http://0.0.0.0:3001/api/v1/posts', {params: searchparams})
    .then(resp => {
      console.log(resp)
      setSpots(resp.data.posts);
      setCount(resp.data.counter);
      setKeyword(resp.data.keyword);
      setTags(resp.data.tags);
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

  const ToSinglePage = (id) => {
    navigate(`/spot/${id}`,{id: id})
  }
  
  console.log(`${process.env.PUBLIC_URL}`)

  return(
    <>
      <h3>spotリスト</h3>
      <p>{keyword ? `キーワード：${keyword}`:``}</p>
      <p>検索結果：{count}件がヒットしました。</p>
      <p>タグ：{tags ? tags.join(',') : "p"}</p>
      <Grid container spacing={3}>
        {spots.slice(offset, offset+ perPage).map((val) => {
        return(  
          <Grid item xs={3}>
            <Card onClick={() => ToSinglePage(val.id)} className = {"spot-list-card"}>
              <CardHeader
                title = { val.name }
              />
              <CardMedia
              component = "img"
              image = { DisplayImg(val.image_url) }
              height = "200"
              />
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
        previousClassName='page-item' // '<'の親要素(li)のクラス名
        nextClassName='page-item' //'>'の親要素(li)のクラス名
        activeClassName={ "active" }
        // disabledClassName={ pagination_disabled } // 使用不可の「<,>」に着くクラス名
        // pageClassName='page-item'
        // pageLinkClassName='page-link'
        // previousLinkClassName='page-link'  //'<'のリンクのクラス名
        // nextLinkClassName='page-link'//'>'のリンクのクラス名
        // breakClassName='page-item' // 上記の「…」のクラス名
        // breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
      />
    </>
  )
}


