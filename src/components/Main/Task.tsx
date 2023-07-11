import React, { useContext } from "react";
import styled from "styled-components";

import Context from "../Context";

import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../redux/store";
import { ITask, TypeStatus } from "../../types/types";
import { deleteTask } from "../../redux/slices/BoardSlice";

interface Props extends ITask {
  nameColumn: TypeStatus;
  nameBoard: string;
}

const Root = styled.li`
  background-color: #2c2c38;
  border-radius: 20px;

  padding: 30px 20px;
  margin-top: 20px;
  position: relative;

  transition: 0.4s;
  cursor: grab;

  &:hover {
    opacity: 0.5;
  }
`;

const Close = styled(IoMdClose)`
  position: absolute;
  right: 10px;
  top: 10px;

  font-size: 18px;

  path {
    fill: ${({ theme }) => theme.primary};
  }

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.primary};
`;

const AmountDoneSubTasks = styled.span``;

const Task: React.FC<Props> = ({
  title,
  nameColumn,
  nameBoard,
}) => {
  const dispatch = useAppDispatch();
  const { onDropTask, onDragOverTask, onDragStartHandler } = useContext(Context);

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ nameBoard: nameBoard.split('-').join(' '), title, nameColumn }));
  };

  return (
    <Root draggable={true} onDrop={(event) => onDropTask(event, nameColumn)} onDragOver={onDragOverTask} onDragStart={() => onDragStartHandler(title, nameColumn)}>
      <Close onClick={deleteTaskHandler} />
      <Title>{title}</Title>
      <AmountDoneSubTasks></AmountDoneSubTasks>
    </Root>
  );
};

export default Task;
