import { styled } from "styled-components";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Header from "./components/Header";
import DefaultPage from "./components/DefaultPage";
import NotFound from "./components/NotFound";

const Wrapper = styled.div`
  display: flex;
`;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  overflow: hidden;
`;

function App() {
  return (
    <Wrapper>
      <Sidebar />
      <WrapperRight>
        <Header />
        <Routes>
            <Route path='/' element={<DefaultPage />}/>
            <Route path="/:id" element={<Main />}/>
            <Route path="*" element={<NotFound />}/>  
        </Routes>
      </WrapperRight> 
    </Wrapper>
  );
}

export default App;
