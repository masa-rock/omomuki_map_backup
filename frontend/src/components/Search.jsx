import { Paper, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState, useEffect } from "react";

export const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState()
  const [tags, setTags] = useState([])
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    axios.get('http://0.0.0.0:3001/api/v1/tag')
    .then(resp => {
      console.log(resp)
      setTags(resp.data)
    })
    .catch(e => {
      console.log(e.response)
    })
  },[])

  const CheckBox = ({id, value, checked, onChange}) => {
    return(
      <input
      id={id}
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={onChange}
      value={value}
    />
    )
  }

  const generateParams = () => {
    const search = {
      tags: checkedItems,
      keyword: keyword 
    }
    return search
  }

  const checkboxChange = e => {
    if(checkedItems.includes(e.target.value)){
      setCheckedItems(checkedItems.filter(item => item !== e.target.value));
    }else{
      setCheckedItems([...checkedItems, e.target.value]);
    }
  }

  const SearchSpot = () => {
    const params = generateParams();
    console.log(params)
    navigate(`/spot/list`,{state: {params: params}})
  }

  return(
    <Paper
      sx = {{
        p: "40px",
        width: "30%",
        m: "300px auto 200px 0"
      }}
      >
        <Subject>
          <h4>スポットを探す</h4>
          <p>キーワードから探す</p>
          <div>
            <TextField 
              type="text"
              id= "name"
              label= "城下町、行きたい場所..."
              name= "name"
              value= {keyword}
              fullWidth
              variant = "standard"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <p>タグから探す</p>
          <CheckBoxButtons>
            {tags.map((val) => {
              return(
                <CheckBoxButton id={val.id} checkedItems={checkedItems}>
                  <label htmlFor={`id_${val.id}`} key = {`key_${val.id}`}>
                    <CheckBox
                      id = {`id_${val.id}`}
                      value = {val.id}
                      onChange = {checkboxChange}
                      checked = {checkedItems.includes(`${val.id}`)}
                    />
                    {val.name}
                  </label>
                </CheckBoxButton>
              )
            })}
          </CheckBoxButtons>
          <Button variant="contained" color="primary" onClick={() => SearchSpot()}>
            検索する
          </Button>
        </Subject>
      </Paper>
  )
}

const Subject = styled.div`
  font-size: 20px;
  text-align: left;
  &&& p{
    margin-top:30px;
    :nth-child(4){
      margin-bottom: 30px;
    }
  }
`

const CheckBoxButton = styled.div`
  &&& input{
    display: none;
  }
  &&& label{
    font-size:16px;
    cursor: pointer;
    border:1px solid #3f51b5;
    background-color: ${props => props.checkedItems.includes(String(props.id)) ? '#3f51b5' : '#fff' };
    color: ${props => props.checkedItems.includes(String(props.id)) ? '#fff' : '#3f51b5' };
    padding: 5px;
    border-radius:3px;
    margin:2px;
    &:hover{
      color: #fff;
      background-color: #3f51b5;
      transition: 0.5s;
    }
  }
`

const CheckBoxButtons = styled.div`
  display: flex;
  height:50px;
  font-size: 0px;
`
