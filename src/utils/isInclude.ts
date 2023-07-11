import { IBoardPage } from "../types/types";

export default (boards: IBoardPage[], title: string, nameBoard: string) => {
  let flag = false;
  boards.forEach((board) => {
    if (board.nameBoard.split("-").join(" ") === nameBoard) {
      board.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          if (task.title === title) flag = true;
        });
      });
    }
  });
  return flag;
};
