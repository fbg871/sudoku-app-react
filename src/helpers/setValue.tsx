
import Cell from "../interfaces/Cell";
import { IState } from "../components/SudokuGame";
import errorCheck from "./errorCheck";
import highlighter from "./highlighter";

const setValue = (index:number, cellsp:IState['cells'], setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>, selected:number[], value:number) => {
    
    const cells = cellsp

    var col = -1
    var row = -1
    var block = -1

    cells.map((cell)=>{
        if(cell.index === index && !cell.isPreFilled){
            cell.value = value
            cell.pencil = []
            cell.temporaryValue = undefined

            col = cell.column
            row = cell.row
            block = cell.block

        }
    })

    if(row !== -1 && col !== -1){
        errorCheck(cells, setCells, index, value, col, row, block)
    }
    highlighter(cellsp, setCells, selected)

}


export default setValue;