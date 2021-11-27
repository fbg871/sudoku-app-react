
import Cell from "../interfaces/Cell";
import { IState } from "../components/SudokuGame";
import errorCheck from "./errorCheck";
import highlighter from "./highlighter";
import Settings from "../interfaces/Settings";

const setValue = (settingsp: Settings,index:number, cellsp:IState['cells'], setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>, selected:number[], value:number) => {
    
    const cells = cellsp

    var col = -1
    var row = -1
    var block = -1

    const settings = settingsp

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
        errorCheck(settings, cells, setCells, index, value, col, row, block)
    }
    highlighter(cellsp, setCells, selected)

}


export default setValue;