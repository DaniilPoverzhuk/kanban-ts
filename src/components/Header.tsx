import React, { useEffect } from "react";
import { styled } from "styled-components";

import getBoardInfo from "../utils/getBoardInfo";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const Root = styled.header`
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.secondary};

  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 25px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Header: React.FC = () => {
  const { currentBoard } = useAppSelector(state => state.board);
  
  return (
    <Root>
      <Title>{currentBoard ?? 'Current Board'}</Title>
    </Root>
  );
};

export default Header;
