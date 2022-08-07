// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
// import { BrowserRouter, Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Header from './components/modules/Header';
import styled from 'styled-components';


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

const App = () => {
  return (
  <div className="App">
    <Header />
    <TopContainer />
  </div>
  // <Router>
  //   <Routes />
  // </Router>
  );
 }

const TopImage = styled.div`
  color: "#fff";
  Padding: "200px";
  BackgroundImage :url(${process.env.PUBLIC_URL}/top_image.jpg);
`;

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
