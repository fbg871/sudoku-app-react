// import React from "react";
// import { IState } from "./SudokuGame";


// var recentValue = -1

// var recentIndex = -1

// var recentRow = -1

// var recentColumn = -1

// const errorCheck = (cell:IState["cell"], numindex: number) => {

//     var err = false

//     if (recentValue !== -1) {
//         cell.map((cell: any) => {
//             if ((cell.column == recentColumn || cell.row == recentRow) && cell.index != numindex) {
//                 if (recentValue === cell.value) {
//                     err = true;
//                 }
//             }
//         })
//     }

//     cell.map((cell: any) => {
//         if (cell.index == numindex) {
//             if (err) {
//                 cell.error = true;
//             } else {
//                 cell.error = false;
//             }
//         }
//     })

//     recentColumn = -1
//     recentIndex = -1
//     recentRow = -1
//     recentValue = -1
// }

// // Remember to add     setCell([...cell]) 


// export const setValue = (cell:IState["cell"][0], value:number) => {

//     console.log("new func")

//     cell.value = value
//     cell.pencil = []
//     recentColumn = cell.column
//     recentIndex = cell.index
//     recentRow = cell.row
//     recentValue = cell.value
//     cell.temporaryValue = undefined
    
//     // errorCheck(cell, cell.index)
//     // highlightRelated(value)
// }

// export const setPencil = (cell:IState["cell"][0]) => {

//     if(cell.temporaryValue !== undefined){
//         cell.pencil.push(cell.temporaryValue)
//     }
//     cell.temporaryValue = undefined

// }

// export const incrementTemporary = (event:React.WheelEvent<SVGRectElement>) => {

// }

// const mouseMoved = (index: number) => {
//     if (mouseIsDown == true) {
//         if (!selected.includes(index)) {
//             selected.push(index)
//         }
//     }
//     setSelected([...selected])
//     highlighter()
// }

// const mouseReleased = (index: number, e?: React.MouseEvent<SVGRectElement, MouseEvent>) => {
//     if (e !== undefined) {
//         // If left click is released
//         if (e.button === 0) {
//             mouseIsDown = false
//             if (!selected.includes(index) && index != 100) {
//                 selected.push(index)
//             }
//             setSelected([...selected])
//             highlighter()

//             cell.map((cell) => {
//                 cell.isRightClick = false
//                 if (cell.temporaryValue != undefined && cell.value === undefined) {

//                     setValue(cell, cell.temporaryValue)
//                 }
//             })
//             setCell([...cell])
//         }
//         // If middle click is released
//         else if (e.button === 1) {
//             deleteValues()
//         }
//         // If left click is released
//         else if (e.button === 2) {

//             if (selected.length === 1) {
//                 cell.map((cell) => {
//                     cell.isRightClick = false
//                     if (cell.temporaryValue != undefined && cell.value === undefined) {
//                         setValue(cell, cell.temporaryValue)
//                     }
//                 })
                
//             }else if(selected.length > 1){
//                 cell.map((cell) => {
//                     cell.isRightClick = false
//                     if(cell.temporaryValue != undefined && cell.value === undefined){
//                         // cell.pencil.push(cell.temporaryValue)
//                         // cell.temporaryValue = undefined
//                         setPencil(cell)
//                     }
//                 })
//             }
//             setSelected([...selected])
//             highlighter()
//         }
//     }
// }

import React from "react";