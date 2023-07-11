import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { IColumn, ITask, TypeStatus } from "../../types/types";

import SetTitleInput from "./SetTitleInput";
import Task from "./Task";
import { useAppDispatch } from "../../redux/store";
import { deleteTask, setTaskTitle } from "../../redux/slices/BoardSlice";

interface Props extends IColumn {
  draggableTitle: string,
  draggableColumn: TypeStatus,
  nameBoard: string,
}

const Root = styled.div`
  min-width: 350px;
`;

const NameColumn = styled.h3`
  color: ${({ theme }) => theme.secondary};
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.5px;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const Circle = styled.span<{ nameColumn: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${({ nameColumn }) => {
    switch (nameColumn) {
      case "todo":
        return "#4AC2E7";
      case "doing":
        return "#645fc6";
      case "done":
        return "#67E0AB";
    }
  }};

  margin-top: 2px;
`;

const AddTask = styled.div<{ visibleInput: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  background-color: #24242e;
  border-radius: 20px;

  color: ${({ theme }) => theme.secondary};
  font-weight: 500;

  padding: 25px 0;

  ${({ visibleInput }) =>
    !visibleInput &&
    css`
      cursor: pointer;
      transition: 0.4s;

      &:hover {
        opacity: 0.5;
        transform: scale(0.9);
      }
    `}
`;

const List = styled.ul`
  list-style: none;
`;

const Column: React.FC<Props> = ({ nameColumn, tasks, draggableTitle, draggableColumn, nameBoard }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const showInput = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setVisible(true);
  };

  const onDragOverColumn = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropColumn = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(deleteTask({ title: draggableTitle, nameBoard: nameBoard.split("-").join(" "), nameColumn: draggableColumn}));
    dispatch(setTaskTitle({ nameBoard, title: draggableTitle, nameColumn}));
  }

  useEffect(() => {
    document.addEventListener("click", () => {
      setVisible(false);
    });

    return () => {
      document.removeEventListener("click", () => {
        setVisible(false);
      });
    };
  }, []);

  return (
    <Root onDragOver={onDragOverColumn} onDrop={onDropColumn}>
      <NameColumn>
        <Circle nameColumn={nameColumn} /> {nameColumn} ({tasks.length})
      </NameColumn>
      <AddTask onClick={showInput} visibleInput={visible}>
        {visible ? (
          <SetTitleInput
            visible={visible}
            setVisible={setVisible}
            nameColumn={nameColumn}
          />
        ) : (
          "Add Task"
        )}
      </AddTask>
      <List>
        {Boolean(tasks.length) &&
          tasks.map((task: ITask) => (
            <Task
              key={task.title}
              {...task}
              nameColumn={nameColumn}
              nameBoard={nameBoard}
            />
          ))}
      </List>
    </Root>
  );
};

export default Column;
