import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";

import { useAppSelector } from "../../redux/store";

import AddBoardInput from "./AddBoardInput";
import List from "./List";
import { useNavigate } from "react-router-dom";

const Root = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.secondary};

  padding: 35px 40px;
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 25px;
  white-space: nowrap;
`;

const Span = styled.span`
  color: #645fc6;
`;

const Title = styled.h3`
  margin: 40px 0 30px 0;

  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary};
`;

const Button = styled.button`
  margin-top: 35px;
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: transparent;
  border: none;

  padding: 10px 15px;

  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: #645fc6;
    outline: 1px solid #645fc6;

    & path {
      transition: 0.4s;
      fill: #645fc6;
    }
  }
`;

const Empty = styled.h3`
  color: ${({ theme }) => theme.secondary};
  text-align: center;
`;

const SVGPlus = styled(AiOutlinePlus)``;

const Sidebar: React.FC = () => {
  const { boards } = useAppSelector((store) => store.board);

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(-1);
  const [addDashboard, setAddDashboard] = useState("");

  const showAddInput = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsAdd(true);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsAdd(false);
      setIsEdit(-1);
      setAddDashboard("");
    });

    return () => {
      document.removeEventListener("click", () => {
        setIsAdd(false);
        setIsEdit(-1);
        setAddDashboard("");
      });
    };
  }, []);

  return (
    <Root>
      <Logo>
        Kanban <Span>Dashboard</Span>
      </Logo>
      <Title>
        All Boards ({Boolean(boards[0]?.nameBoard) ? boards.length : "0"})
      </Title>
      {isAdd && (
        <AddBoardInput
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          addDashboard={addDashboard}
          setAddDashboard={setAddDashboard}
        />
      )}
      {Boolean(boards[0]?.nameBoard) ? (
        <List boards={boards} isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        !isAdd && <Empty>No boards :(</Empty>
      )}
      <Button onClick={showAddInput}>
        <SVGPlus />
        Create New Board
      </Button>
    </Root>
  );
};

export default Sidebar;
