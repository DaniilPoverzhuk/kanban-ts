export interface IBoardPage {
  nameBoard: string;
  columns: IColumn[];
}

export interface IColumn {
  nameColumn: TypeStatus;
  tasks: ITask[];
}

export interface ITask {
  title: string;
  items: ITaskItem[];
  status: TypeStatus;
}

export interface ITaskItem {
  value: string;
}

export type TypeStatus = "todo" | "doing" | "done";
