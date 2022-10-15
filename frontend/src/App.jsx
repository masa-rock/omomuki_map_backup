import './App.css';
import './mypage.css';
import React, {createContext, useEffect, useState} from 'react';
import Header from './components/modules/Header';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./apis/auth";
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';
import { EditProfile } from './components/EditProfile';
import { WantToGo } from './components/WantToGo';
import { SpotNew } from './components/SpotNew';
import { SpotList } from './components/SpotList';
import { SpotSinglePage} from './components/SpotSinglePage';
import { Search } from './components/Search'

export const AuthContext = createContext();

  const App = () => {
    console.log("start")
    const [loading, setLoading] = useState();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const handleGetCurrentUser = async () => {
      try{
        const res = await getCurrentUser();
        if (res?.data.isLogin === true) {
        // res.then(resp =>
          setIsSignedIn(true);
          setCurrentUser(res.data.data);
          console.log(res.data.data);
        }else {
          console.log("hogeelse?")
          console.log("no current user");
        }
      }catch (e) {
        console.log(e)
        console.log("hogecatch?ex")
      }
      setLoading(false);
    };
   
    useEffect(() => {
      console.log("3.1")
      handleGetCurrentUser()
    }, [setCurrentUser])

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
          <Route path="/" element={
            <>
              <ContainerStyle>
                <Search />
              </ContainerStyle>
              <Home />
            </>
          } />
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
          <Route path="/edit-profile" element={
            <EditProfile />
          } />
          <Route path="/want_to_go" element={
            <WantToGo />
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
