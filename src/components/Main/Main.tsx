import React, { useEffect } from "react";
import styled from "styled-components";

import Column from "./Column";

import { IBoardPage } from "../../types/types";
import { useNavigate } from "react-router-dom";

const Root = styled.main`
  background-color: ${({ theme }) => theme.backgroundMain};
  height: calc(100vh - 96.8px);

  display: flex;
  gap: 20px;
  padding: 30px 20px;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 7px;
    width: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 20px;
  }

  > div {
    min-width: 350px;
  }
`;

const Main: React.FC<IBoardPage> = ({ columns, nameBoard }) => {
  return (
    <Root>
      {columns.map(
        (column, idx) => column.nameColumn && <Column key={idx} {...column} />
      )}
    </Root>
  );
};

export default Main;
