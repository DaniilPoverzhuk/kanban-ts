import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";

import {
  deleteBoard,
  setCurrentBoard,
  changeNameBoard,
} from "../../redux/slices/BoardSlice";
import { useAppDispatch } from "../../redux/store";
import { IBoardPage } from "../../types/types";

interface Props {
  nameBoard: string;
  idx: number;
  active: number;
  isEdit: number;
  boards: IBoardPage[];
  setActive: (idx: number) => void;
  setIsEdit: (idx: number) => void;
}

const Root = styled.li<{ active: string }>`
  a {
    color: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
    font-weight: 500;
    text-decoration: none;
    font-size: 16px;

    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    z-index: 10;
    position: relative;

    transition: 0.4s;
    cursor: pointer;

    &::after {
      content: "";
      width: calc(100% + 40px);
      height: 100%;

      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #645fc6;

      top: 0;
      left: -40px;
      position: absolute;
      z-index: -1;

      opacity: ${({ active }) => (active === "1" ? "1" : "0")};
      transition: 0.4s;
    }

    &:hover,
    &:hover::after {
      transition: 0.4s;
      color: ${({ theme }) => theme.primary};
      opacity: 1;
    }
  }
`;

const EditInput = styled.input`
  border: none;
  background: transparent;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const SVGDashboard = styled(MdOutlineSpaceDashboard)``;

const SVGClose = styled(IoMdClose)`
  position: absolute;
  right: 15px;

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }
`;

const SVGEdit = styled(FiEdit2)`
  position: absolute;
  right: 40px;

  font-size: 13px;

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }
`;

const SVGCheck = styled(BsCheck2)`
  position: absolute;
  right: 15px;

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }
`;

const Item: React.FC<Props> = ({
  nameBoard,
  idx,
  isEdit,
  active,
  setActive,
  setIsEdit,
}) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const setActiveHandler = (event: React.MouseEvent, idx: number) => {
    event.stopPropagation();
    if (active !== idx) setIsEdit(-1);
    setActive(idx);
  };

  const deleteBoardHandler = (nameBoard: string) => {
    dispatch(deleteBoard({ nameBoard }));
  };

  const changeNameBoardHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  const dispatchChangedValue = () => {
    dispatch(
      changeNameBoard({
        newName: editValue,
        oldName: nameBoard,
      })
    );
    dispatch(setCurrentBoard({ board: editValue }));
    setEditValue("");
    setIsEdit(-1);
  };

  const showEditInput = (idx: number) => {
    setIsEdit(idx);
  };

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <Root
      key={idx}
      active={idx === active ? "1" : "0"}
      onMouseMove={() => setIsVisible(idx)}
      onMouseLeave={() => setIsVisible(-1)}
      onClick={(event) => setActiveHandler(event, idx)}
    >
      <Link to={nameBoard}>
        <SVGDashboard />
        {idx === isEdit ? (
          <EditInput
            ref={editInputRef}
            onChange={changeNameBoardHandler}
            defaultValue={nameBoard.split("-").join(" ")}
          />
        ) : (
          nameBoard.split("-").join(" ")
        )}
        {idx === isVisible && (
          <>
            <SVGEdit onClick={() => showEditInput(idx)} />
            {active === isEdit ? (
              <SVGCheck onClick={dispatchChangedValue} />
            ) : (
              <SVGClose onClick={() => deleteBoardHandler(nameBoard)} />
            )}
          </>
        )}
      </Link>
    </Root>
  );
};

export default Item;
