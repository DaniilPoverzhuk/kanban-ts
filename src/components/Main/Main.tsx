import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../redux/store";
import { deleteTask, setTaskTitle } from "../../redux/slices/BoardSlice";

import Column from "./Column";

import Context from "../Context";

import { TypeStatus } from "../../types/types";

import getBoardInfo from "../../utils/getBoardInfo";
import { useNavigate, useParams } from "react-router-dom";

const Root = styled.main`
  background-color: ${({ theme }) => theme.backgroundMain};
  height: 100%;

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

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { columns, boards, nameBoard } = getBoardInfo(id!);
  const [draggableTitle, setDraggableTitle] = useState('');
  const [draggableColumn, setDraggableColumn] = useState<TypeStatus>('');

  const onDragStartHandler = (title: string, nameColumn: TypeStatus) => {
    setDraggableTitle(title);
    setDraggableColumn(nameColumn);
  };

  const onDragOverTask = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const onDropTask = (event: React.DragEvent<HTMLLIElement>, nameColumn: TypeStatus) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(deleteTask({ title: draggableTitle, nameBoard: nameBoard?.split("-").join(" ")!, nameColumn: draggableColumn}));
    dispatch(setTaskTitle({ nameBoard: nameBoard!, title: draggableTitle, nameColumn}));
  };

  return (
    <Context.Provider value={{onDropTask, onDragOverTask, onDragStartHandler}}>
          <Root>
      {columns?.map(
        (column, idx) => <Column key={idx} {...column} draggableTitle={draggableTitle} draggableColumn={draggableColumn} nameBoard={nameBoard!}/>
      )}
    </Root>
    </Context.Provider>
  );
};

export default Main;
