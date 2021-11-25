import React from "react";
import { IState } from "./SudokuGame";


var recentValue = -1

var recentIndex = -1

var recentRow = -1

var recentColumn = -1

const errorCheck = (cell:IState["cell"], numindex: number) => {

    var err = false

    if (recentValue !== -1) {
        cell.map((cell: any) => {
            if ((cell.column == recentColumn || cell.row == recentRow) && cell.index != numindex) {
                if (recentValue === cell.value) {
                    err = true;
                }
            }
        })
    }

    cell.map((cell: any) => {
        if (cell.index == numindex) {
            if (err) {
                cell.error = true;
            } else {
                cell.error = false;
            }
        }
    })

    recentColumn = -1
    recentIndex = -1
    recentRow = -1
    recentValue = -1
}

// Remember to add     setCell([...cell]) 


export const setValue = (cell:IState["cell"][0], value:number) => {

    console.log("new func")

    cell.value = value
    cell.pencil = []
    recentColumn = cell.column
    recentIndex = cell.index
    recentRow = cell.row
    recentValue = cell.value
    cell.temporaryValue = undefined
    
    // errorCheck(cell, cell.index)
    // highlightRelated(value)
}

export const setPencil = (cell:IState["cell"][0]) => {

    if(cell.temporaryValue !== undefined){
        cell.pencil.push(cell.temporaryValue)
    }
    cell.temporaryValue = undefined

}