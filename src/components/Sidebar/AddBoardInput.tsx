import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setBoards } from "../../redux/slices/BoardSlice";

import isError from "../../utils/isError";

interface Props {
  isAdd: boolean;
  setIsAdd: (visible: boolean) => void;
  addDashboard: string;
  setAddDashboard: (str: string) => void;
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  position: relative;
  z-index: 10;

  & path {
    fill: ${({ theme }) => theme.primary};
  }

  &::after {
    content: "";
    width: 140%;
    height: 100%;

    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: #645fc6;

    top: -50%;
    left: -25%;
    position: absolute;
    padding: 10px 0;
    z-index: -1;

    transition: 0.4s;
  }
`;

const AddInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};

  &:focus {
    outline: none;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 11px;
  white-space: nowrap;

  position: absolute;
  bottom: -165%;
`;

const AddBoardInput: React.FC<Props> = ({
  isAdd,
  setIsAdd,
  addDashboard,
  setAddDashboard,
}) => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((store) => store.board);
  const [errors, setErrors] = useState("");
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!addDashboard || addDashboard.trim()) {
      return setErrors("");
    }

    if (addDashboard && !addDashboard.trim()) {
      return setErrors("Введите валидные значения");
    }
  }, [addDashboard]);

  useEffect(() => {
    addInputRef.current?.focus();
  }, [isAdd]);

  const addDashboardHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (isError(errors, addDashboard, setErrors, boards)) return;

      dispatch(setBoards({ nameBoard: addDashboard }));
      setIsAdd(false);
      setAddDashboard("");
    }
  };

  return (
    <Label onClick={(event) => event.stopPropagation()}>
      <AddInput
        ref={addInputRef}
        onChange={(event) => setAddDashboard(event.target.value)}
        onKeyDown={addDashboardHandler}
      />
      {errors && <Error>{errors}</Error>}
    </Label>
  );
};

export default AddBoardInput;
