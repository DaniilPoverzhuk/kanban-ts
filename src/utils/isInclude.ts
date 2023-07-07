import { IBoardPage } from "../types/types";

export default (boards: IBoardPage[], title: string, currentBoard: string) => {
  let flag = false;
  boards.forEach((board) => {
    if (board.nameBoard.split("-").join(" ") === currentBoard) {
      board.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          console.log(task);
          if (task.title === title) flag = true;
        });
      });
    }
  });
  return flag;
};
