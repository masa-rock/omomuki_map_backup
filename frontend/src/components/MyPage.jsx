import styled from 'styled-components';
import {Sidebar} from './Sidebar';

export const MyPage = () =>{
  return(
    <>
    <MyPageContainer>
      <SideBarContainer>
        <Sidebar/>
      </SideBarContainer>
      <MainContainer>
      </MainContainer>
    </MyPageContainer>
    </>
  )
}

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;
`

const SideBarContainer = styled.div`
  width: 200px;
  background-color: #2d445d;
`

const MainContainer = styled.div`
  background-color: #f5f5f5;
  width: calc(100% - 200px)
`
