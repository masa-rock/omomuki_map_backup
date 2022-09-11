import './App.css';
import React, {createContext, useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import Header from './components/modules/Header';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./apis/auth";
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';
import { SpotNew } from './components/SpotNew';
import { SpotList } from './components/SpotList';
import { SpotSinglePage} from './components/SpotSinglePage';
import { Search } from './components/Search'

export const AuthContext = createContext();

  const App = () => {
    const [loading, setLoading] = useState();
    const [isSignedIn, setIsSignedIn] = useState();
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
          // return <Redirect to="signin" />;
        }
      } else {
        return <></>;
      }
    };
  return (
  <div className="App">
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
    <Router>
    <Header />
      <Routes>          
        <Route path="/signup" element={
          <ContainerStyle>
            <SignUp />
          </ContainerStyle>
        }/>
        <Route path="/signin" element={
          <ContainerStyle>
          <SignIn />
          </ContainerStyle>
        } />
        <Route path="/" element={
          <>
            <ContainerStyle>
              <Search />
            </ContainerStyle>
            <Home />
          </>
        } />
        <Route path="/spot/new" element={
          <ContainerStyle>
            <SpotNew />
          </ContainerStyle>
          } />
        <Route path="/spot/list" element={
          <ContainerStyle>
            <SpotList />
          </ContainerStyle>
        } />
        <Route path="/spot/:id" element={
          <ContainerStyle>
          <SpotSinglePage />
        </ContainerStyle>
        } />
      </Routes>
    </Router>
    </AuthContext.Provider>
  </div>
  );
 }

const Title = styled.h1`
 color: #aeaeae;
 font-size: 80px
 `;

const ContainerStyle = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/top_image.jpg);
  background-size: cover;
  padding: 100px 200px;
  color: #aeaeae;
  font-size: 80px
`;

export default App;
