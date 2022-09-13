import { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, CardHeader, Card } from "@material-ui/core";
import { CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export const SpotList = () => {
  const [spots, setSpots] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const searchparams = location.state.params
  const [ offset, setOffset ] = useState(0);
  const perPage = 5;

  const handlePageChange = (data) => {
    let page_number = data['selected'];
    setOffset(page_number*perPage)
  }

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
        {spots.slice(offset, offset+ perPage).map((val) => {
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
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        pageCount={Math.ceil(spots.length/perPage)}
        activeClassName='active'
        onPageChange={handlePageChange}
        previousLabel='<'
        nextLabel='>'
        previousClassName='page-item' // '<'の親要素(li)のクラス名
        nextClassName='page-item' //'>'の親要素(li)のクラス名
        previousLinkClassName='page-link'  //'<'のリンクのクラス名
        nextLinkClassName='page-link'//'>'のリンクのクラス名
        breakLabel='...'
        breakClassName='page-item' // 上記の「…」のクラス名
        breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
      />
    </>
  )
}
