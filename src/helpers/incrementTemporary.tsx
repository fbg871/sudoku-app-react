import { IState } from "../components/SudokuGame";

const incrementTemporary = (
    cells:IState['cells'],
    setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>,
    event:React.WheelEvent<SVGRectElement>
    ) => {

        cells.map((cell) => {
            if(cell.isRightClick){
                if (cell.temporaryValue === undefined) {
                    cell.temporaryValue = 1
                } else if (event.nativeEvent.deltaY < 0) {
                    if (cell.temporaryValue === 9) {
                        cell.temporaryValue = 1
                    } else {
                        cell.temporaryValue = cell.temporaryValue + 1
                    }
                } else {
                    if (cell.temporaryValue === 1) {
                        cell.temporaryValue = 9
                    } else {
                        cell.temporaryValue = cell.temporaryValue - 1
                    }
                }
            }
        })
    setCells([...cells])
}

export default incrementTemporary;