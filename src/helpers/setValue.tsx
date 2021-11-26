
import Cell from "../interfaces/Cell";
import { IState } from "../components/SudokuGame";
import errorCheck from "./errorCheck";

const setValue = (index:number, cells:IState['cells'], setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>, value:number) => {
    
    console.log("NEW FUNCTIONS WORKING")

    var col = -1
    var row = -1

    cells.map((cell)=>{
        if(cell.index === index && !cell.isPreFilled){
            cell.value = value
            cell.pencil = []
            cell.temporaryValue = undefined

            col = cell.column
            row = cell.row

        }
    })

    if(row !== -1 && col !== -1){
        errorCheck(cells, setCells, index, value, col, row)
    }

}


export default setValue;