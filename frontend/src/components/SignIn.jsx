import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { signIn } from '../apis/auth';
import { AuthContext } from "../App";
import { Paper, TextField, Typography } from "@mui/material";
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const SignIn = (e) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password
    };
    return signInParams;
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try{
      const res = await signIn(params);
      console.log(res);
      if (res.status === 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")
      }
    } catch (e){
      console.log(e);
    }
  }

  return (
    <Paper
      sx = {{
        p: "100px",
        width: "400px",
        m: "0 auto"
      }}
    >
    <div>
    <Typography variant={"h5"} sx={{ m: "30px" }}>
      ログイン画面
    </Typography>
    <form>
      <div>
        <TextField 
          type=" email"
          id= "email"
          label= "メールアドレス"
          name= "email"
          value= {email}
          fullWidth
          variant = "standard"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <div>
        <TextField
          type="password"
          id="password"
          label="パスワード"
          name="password"
          value={password}
          fullWidth
          variant = "standard"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSignInSubmit(e)}>
          ログイン
        </Button>
      </div>
    </form>
    <Space>
      <Button variant ="outlined" color="primary" component={Link} to="/signup">
        新規登録する
      </Button>
    </Space>
    <Button variant ="outlined" color="primary" component={Link} to="/">
      トップへ戻る
    </Button>
    </div>
    </Paper>
  )
}

const Space = styled.div`
  margin-right:10px;
  display:inline;
`;
