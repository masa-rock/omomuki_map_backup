import { useState, useContext, useMemo } from "react";
import { TextField } from "@mui/material";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useEffect } from 'react';
import { updatePassword } from "../apis/auth";

export const UpdatePassword = () => {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const params = {
    password: password,
    password_confirmation: passwordConfirmation
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault()    
    const update_params = params
      const res = fetch(updatePassword(update_params))
      .then(
        navigate("/")
      ).catch(e)(
        console.log(e)
      )
  }

  return(
    <div className='mypage-container'>
      <div className='sidebar-container'>
        <Sidebar/>
      </div>
      <div className = "main-container">
      <p>パスワード変更</p>
      <form>
      <TextField 
          type="password"
          id= "update-password"
          label= "パスワード"
          name= "password"
          value= {password}
          fullWidth
          variant = "standard"
          onChange={(e) => setPassword(e.target.value)}
          margin = "normal"
        />
        <TextField
          type="password"
          id="update-confirm-password"
          label="パスワード（確認用）"
          name="password_confirmation"
          value={passwordConfirmation}
          fullWidth
          variant = "standard"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          margin = "normal"
        />
        <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSignInSubmit(e)}>
          更新
        </Button>
      </form>
      </div>
    </div>
  )
}