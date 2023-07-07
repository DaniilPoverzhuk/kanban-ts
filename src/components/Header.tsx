import React, { useEffect } from "react";
import { styled } from "styled-components";

import { useAppSelector } from "../redux/store";

import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 7px;

  border-radius: 15px;
  background: #645fc6;
  border: none;

  color: ${({ theme }) => theme.primary};
  font-weight: 500;

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background: transparent;
    outline: 1px solid #645fc6;
    color: #645fc6;
  }
`;

const SVGPlus = styled(AiOutlinePlus)`
  &:hover {
    path {
      fill: #645fc6;
    }
  }
`;

const Header: React.FC = () => {
  const { currentBoard, boards } = useAppSelector((store) => store.board);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${currentBoard.split(" ").join("-")}`);
  }, [currentBoard]);

  return (
    <Root>
      <Title>{boards.length ? currentBoard : "Current Board"}</Title>
      <Right>
        {Boolean(boards.length) && (
          <Button>
            <SVGPlus />
            Add New Task
          </Button>
        )}
      </Right>
    </Root>
  );
};

export default Header;
