// import logo from './logo.svg';
import './App.css';
import React, {createContext, useEffect, useState} from 'react';
// import { BrowserRouter, Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Header from './components/modules/Header';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./apis/auth";
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';

export const AuthContext = createContext();

const App = () => {
  return (
  <div className="App">
    <Header />
    <TopContainer />
    <LoginComponent/>
  </div>
  // <Router>
  //   <Routes />
  // </Router>
  );
 }

function LoginComponent() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="signin" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Private>
            <Route exact path="/">
              <Home />
            </Route>
          </Private>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

 const TopContainer = () => {
   const [count,setCount] = useState(0);
   return(
     <div>
       <ContainerStyle>
         <h1>Hello World</h1>
       <p>you clicked {count} times</p>
       <Button variant="contained" color= "primary" onClick={() => setCount(count + 1)}>
         Click me
       </Button>
       <Title>here is big?</Title>
       </ContainerStyle>
     </div>
   );
 };



const Title = styled.h1`
 color: #aeaeae;
 font-size: 80px
 `;

const ContainerStyle = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/top_image.jpg);
  padding: 200px;
  color: #aeaeae;
  font-size: 80px
`;

export default App;
