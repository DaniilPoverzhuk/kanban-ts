import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../../redux/store";

import AddBoardInput from "./AddBoardInput";
import List from "./List";
import { useNavigate, useParams } from "react-router-dom";

import Context from '../Context';
import { setCurrentBoard } from "../../redux/slices/BoardSlice";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(-1);
  const [addDashboard, setAddDashboard] = useState("");
  const [active, setActive] = useState(0);

  const showAddInput = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsAdd(true);
  };

  useEffect(() => {  
    setActive(0);
  }, [boards.length]);

  useEffect(() => {
    if (!boards.length) {
      navigate('/');
      dispatch(setCurrentBoard({nameBoard: 'currentBoard'}));
      return;
    };

    navigate(`/${boards[active]?.nameBoard.split(" ").join("-")}`)
    dispatch(setCurrentBoard({nameBoard: boards[active]?.nameBoard.split('-').join(' ')}))
  }, [active, boards])

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
    <Context.Provider value={{ isEdit, setIsEdit, active, setActive }}>
          <Root>
      <Logo>
        Kanban <Span>Dashboard</Span>
      </Logo>
      <Title>
        All Boards ({ boards.length })
      </Title>
      {isAdd && (
        <AddBoardInput
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          addDashboard={addDashboard}
          setAddDashboard={setAddDashboard}
        />
      )}
      {Boolean(boards.length) ? (
        <List boards={boards} isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        !isAdd && <Empty>No boards :(</Empty>
      )}
      <Button onClick={showAddInput}>
        <SVGPlus />
        Create New Board
      </Button>
    </Root>
    </Context.Provider>
  );
};

export default Sidebar;
