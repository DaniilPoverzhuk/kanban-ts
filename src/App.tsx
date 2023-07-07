import { styled } from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Header from "./components/Header";

import { useAppSelector } from "./redux/store";
import DefaultPage from "./components/DefaultPage";
import { useEffect } from "react";

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
  const { boards } = useAppSelector((store) => store.board);

  return (
    <Wrapper>
      <Sidebar />
      <WrapperRight>
        <Header />
        {!Boolean(boards.length) && <DefaultPage />}
        <Routes>
          {boards.map((board) => {
            return (
              <Route
                key={board.nameBoard}
                path={`/${board.nameBoard}`}
                element={<Main {...board} />}
              />
            );
          })}
        </Routes>
      </WrapperRight>
    </Wrapper>
  );
}

export default App;
