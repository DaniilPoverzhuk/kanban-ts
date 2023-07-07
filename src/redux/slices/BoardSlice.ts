import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoardPage, IColumn, TypeStatus } from "../../types/types";

interface IInitialState {
  boards: IBoardPage[];
  currentBoard: string;
}

const board: IBoardPage = {
  nameBoard: "",
  columns: [
    {
      nameColumn: "todo",
      tasks: [],
    },
    {
      nameColumn: "doing",
      tasks: [],
    },
    {
      nameColumn: "done",
      tasks: [],
    },
  ],
};

const initialState: IInitialState = {
  boards: [{ ...board, nameBoard: "Default-Page" }],
  currentBoard: "Default Page",
};

const BoardSlice = createSlice({
  name: "BoardSlice",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<{ actionBoard: string }>) => {
      state.boards.unshift({
        ...board,
        nameBoard: action.payload.actionBoard.split(" ").join("-"),
      });
    },
    setCurrentBoard: (state, action: PayloadAction<{ board: string }>) => {
      state.currentBoard = action.payload.board;
    },
    setTaskTitle: (
      state,
      action: PayloadAction<{
        nameBoard: string;
        title: string;
        nameColumn: string;
      }>
    ) => {
      const board = state.boards.find(
        (board) =>
          board.nameBoard === action.payload.nameBoard.split(" ").join("-")
      );
      const columnType = board?.columns.find(
        (column) => column.nameColumn === action.payload.nameColumn
      );

      if (columnType) {
        columnType.tasks.unshift({
          title: action.payload.title,
          items: [{ value: "" }],
          status: columnType.nameColumn,
        });
      }
    },
    changeNameBoard: (
      state,
      action: PayloadAction<{ newName: string; oldName: string }>
    ) => {
      state.boards.filter((board) => {
        if (board.nameBoard === action.payload.oldName) {
          board.nameBoard = action.payload.newName.split(" ").join("-");
        }
        return board;
      });
    },
    deleteBoard: (state, action: PayloadAction<{ nameBoard: string }>) => {
      state.boards = state.boards.filter(
        (board) => board.nameBoard !== action.payload.nameBoard
      );
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        title: string;
        currentBoard: string;
        nameColumn: TypeStatus;
      }>
    ) => {
      const boardCondition = (board: IBoardPage) =>
        board.nameBoard.split("-").join(" ") === action.payload.currentBoard;
      const columnCondition = (column: IColumn) =>
        column.nameColumn === action.payload.nameColumn;

      const board = state.boards.filter((board) => boardCondition(board));

      const column = board[0].columns.filter((column) =>
        columnCondition(column)
      );

      const tasks = column[0].tasks.filter(
        (task) => task.title !== action.payload.title
      );

      state.boards.forEach((board) => {
        if (boardCondition(board)) {
          board.columns.forEach((column) => {
            if (columnCondition(column)) column.tasks = tasks;
          });
        }
      });
    },
  },
});

export default BoardSlice.reducer;
export const {
  setBoards,
  deleteBoard,
  setCurrentBoard,
  changeNameBoard,
  setTaskTitle,
  deleteTask,
} = BoardSlice.actions;
