import { useAppSelector } from "../redux/store";

export default (id: string) => {
    const { boards } = useAppSelector(state => state.board);

    const board = boards.find(board => board.nameBoard === id)

    return { nameBoard: board?.nameBoard, columns: board?.columns, boards }
}