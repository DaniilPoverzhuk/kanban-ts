import React from "react";
import styled from "styled-components";

const Root = styled.main`
  height: calc(100vh - 96.8px);
  background-color: ${({ theme }) => theme.backgroundMain};

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  color: ${({ theme }) => theme.primary};
  font-size: 30px;
  font-weight: 500;
`;

const DefaultPage: React.FC = () => {
  return <Root>Please create a board 😕</Root>;
};

export default DefaultPage;
