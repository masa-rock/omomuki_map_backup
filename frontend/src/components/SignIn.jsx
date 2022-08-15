import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { signIn } from '../apis/auth';
import { AuthContext } from "../App";

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
    <div>
      <p>SignInページです</p>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
         <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={(e) => handleSignInSubmit(e)}>ログイン</button>
        </div>

      </form>
      <Link to={"/"}>Login</Link>
      <Link to={"/signup"}>Singup</Link>
    </div>
  )
}
