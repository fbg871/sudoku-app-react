import { IState } from "../components/SudokuGame";

const deleteValues = (
    cellsp:IState["cells"], 
    setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>, 
    selected:IState["selected"]
    ) => {

        const cells = cellsp

        cells.map((cell) => {
            if (selected.includes(cell.index) && !cell.isPreFilled) {
                cell.value = undefined
                cell.temporaryValue = undefined

                cell.pencil = []
                cell.error = false
            }
            cell.isRelated = false
        })
        setCells([...cells])
}

export default deleteValues;