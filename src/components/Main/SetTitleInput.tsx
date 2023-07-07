import React, { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import { IoMdClose } from "react-icons/io";
import { BsCheck2 } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTaskTitle } from "../../redux/slices/BoardSlice";
import isInclude from "../../utils/isInclude";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  nameColumn: string;
}

const Root = styled.div`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.primary};

  width: 70%;
`;

const Input = styled.input`
  background: transparent;
  border: none;

  padding-bottom: 5px;

  width: 80%;

  color: ${({ theme }) => theme.primary};

  &:focus {
    outline: none;
  }
`;

const Close = styled(IoMdClose)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  path {
    fill: ${({ theme }) => theme.primary};
  }

  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: 0.6;
  }
`;

const Check = styled(BsCheck2)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  path {
    fill: ${({ theme }) => theme.primary};
  }

  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: 0.6;
  }
`;

const SetTitleInput: React.FC<Props> = ({
  visible,
  setVisible,
  nameColumn,
}) => {
  const dispatch = useAppDispatch();
  const { currentBoard, boards } = useAppSelector((store) => store.board);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setTitle("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const addTaskHandler = (event: React.MouseEvent<SVGElement>) => {
    if (isInclude(boards, title, currentBoard))
      return toast.error("Задача с таким названим уже есть!");
    event.stopPropagation();
    setVisible(false);
    clearInput();
    dispatch(setTaskTitle({ nameBoard: currentBoard, nameColumn, title }));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  return (
    <>
      <Root>
        <Input
          ref={inputRef}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter title"
        />
        {title && (
          <>
            <Close onClick={clearInput} />
            <Check onClick={addTaskHandler} />
          </>
        )}
      </Root>
      <ToastContainer />
    </>
  );
};

export default SetTitleInput;
