import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const List: React.FC<ListProps> = ({ boards }) => {
  return (
    <Root>
      {boards.map((item, idx) => (
        <Item
          key={item.nameBoard}
          {...item}
          idx={idx}
          boards={boards}
        />
      ))}
    </Root>
  );
};

export default List;
