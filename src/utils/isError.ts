import { IBoardPage } from "../types/types";

export default (
  errors: string,
  addDashboard: string,
  setErrors: (message: string) => void,
  boards: IBoardPage[]
) => {
  if (errors) return true;

  if (!addDashboard) {
    setErrors("Введите значение");
    return true;
  }

  if (addDashboard.length > 15) {
    setErrors("Максимальное количество символов - 15");
    return true;
  }

  if (boards.find((board) => board.nameBoard === addDashboard)) {
    setErrors("Элемент с таким названием уже есть");
    return true;
  }

  return false;
};
