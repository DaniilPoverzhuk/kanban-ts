import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";

import { setCurrentBoard } from "../../redux/slices/BoardSlice";
import { useAppDispatch } from "../../redux/store";

import { IBoardPage } from "../../types/types";
import Item from "./Item";

interface ListProps {
  boards: IBoardPage[];
  isEdit: number;
  setIsEdit: (idx: number) => void;
}

const Root = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const List: React.FC<ListProps> = ({ boards, isEdit, setIsEdit }) => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    dispatch(
      setCurrentBoard({ board: boards[0].nameBoard.split("-").join(" ") })
    );
  }, [boards.length]);

  useEffect(() => {
    dispatch(
      setCurrentBoard({ board: boards[active].nameBoard.split("-").join(" ") })
    );
  }, [active]);

  return (
    <Root>
      {boards.map((item, idx) => (
        <Item
          key={item.nameBoard}
          {...item}
          idx={idx}
          isEdit={isEdit}
          active={active}
          boards={boards}
          setIsEdit={setIsEdit}
          setActive={setActive}
        />
      ))}
    </Root>
  );
};

export default List;
