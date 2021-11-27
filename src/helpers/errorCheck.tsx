import Cell from "../interfaces/Cell";
import { IState } from "../components/SudokuGame";

const errorCheck = 
(
    cellsp:IState["cells"], 
    setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>,
    index:number, 
    recentValue:number, 
    recentColumn:number, 
    recentRow:number,
    recentBlock:number
)   => {

    const cells = cellsp

    var err = false

        if (recentValue == -1) {
        } else {
            cells.map((cell: any) => {
                if ((cell.column == recentColumn || cell.row == recentRow || cell.block == recentBlock) && cell.index != index) {
                    if (recentValue == cell.value && recentValue != 0) {
                        err = true;
                    }
                }
            })
        }

        cells.map((cell: any) => {
            if (cell.index == index) {
                if (err) {
                    cell.error = true;
                } else {
                    cell.error = false;
                }
            }
        })

        setCells([...cells])
}

export default errorCheck;