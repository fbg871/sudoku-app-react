import { IState } from "../components/SudokuGame";
import errorCheck from "./errorCheck";

const setPencil = (
    selected:IState['selected'],
    cells:IState['cells'],
    setCell:React.Dispatch<React.SetStateAction<IState["cells"]>>,
    event?: React.KeyboardEvent<SVGGElement>
) => {

    var penc:number[] = []

    if(event === undefined){
        cells.map((cell) => {
            if(cell.temporaryValue !== undefined && cell.value === undefined){
                cell.pencil.push(cell.temporaryValue)
            }
            cell.temporaryValue = undefined
        })

    }else{
        cells.map((cell) => {
            if(selected.includes(cell.index)){
                if(cell.pencil.includes(parseInt(event.key))){
                    cell.pencil.map((pen)=>{
                        if(pen !== parseInt(event.key)){
                            penc.push(pen)
                        }
                    })
                    cell.pencil = penc
                }else{
                    cell.pencil.push(parseInt(event.key))
                }
            }
            penc = []
        })
    }
}

export default setPencil;