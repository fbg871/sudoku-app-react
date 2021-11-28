import React, { SetStateAction } from "react";
import { IState } from "../components/SudokuGame";
import Cell from "../interfaces/Cell";

const deleteValues = (
    filled: boolean[], 
    setFilled:React.Dispatch<React.SetStateAction<boolean[]>>,
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

                filled[cell.index] = false
                setFilled(filled)
            }
            cell.isRelated = false
        })
        setCells([...cells])
}

export default deleteValues;