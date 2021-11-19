import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import SudokuGrid, { IState as Props } from "./SudokuGrid";
import blockInvalid from "./blockInvalid"
import { setConstantValue } from 'typescript';

import { generateSolved } from "./SudokuGenerate";
import { clearLine } from 'readline';


export var currently_selected: any[] = [];

var mouseIsDown = false;

const sudoku_test = [
    [6, 0, 0, 0, 4, 3, 0, 0, 0],
    [0, 2, 9, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 4],
    [3, 4, 1, 0, 0, 2, 0, 7, 0],
    [0, 0, 0, 0, 0, 8, 9, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 1, 0, 6, 7, 4, 0, 0, 3],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 5, 0, 1, 0, 0, 0, 0, 0]
]

const solved_test = [
    [6, 8, 7, 2, 4, 3, 1, 9, 5],
    [4, 2, 9, 5, 1, 6, 3, 8, 7],
    [1, 3, 5, 8, 9, 7, 6, 2, 4],
    [3, 4, 1, 9, 6, 2, 5, 7, 8],
    [5, 7, 2, 4, 3, 8, 9, 6, 1],
    [8, 9, 6, 7, 5, 1, 4, 3, 2],
    [9, 1, 8, 6, 7, 4, 2, 5, 3],
    [2, 6, 4, 3, 8, 5, 7, 1, 9],
    [7, 5, 3, 1, 2, 9, 8, 4, 6]
]

// interface IProps {
//     cell: Props["cell"]
//     // setCell: React.Dispatch<React.SetStateAction<Props["cell"]>>
// }



const SudokuCell = ({ cell, setCell, selected, setSelected }: {
    cell: {
        value?: number;
        isPreFilled: boolean;
        isSelected: boolean;
        isRelated: boolean;
        isBoldTop: boolean;
        isBoldBottom: boolean;
        isBoldLeft: boolean;
        isBoldRight: boolean;
        row: number;
        column: number;
        index: number;
        error: boolean;
        block: number;
        pencil: number[];
    }[]

    setCell: React.Dispatch<React.SetStateAction<{
        value?: number | undefined;
        isPreFilled: boolean;
        isSelected: boolean;
        isRelated: boolean;
        isBoldTop: boolean;
        isBoldBottom: boolean;
        isBoldLeft: boolean;
        isBoldRight: boolean;
        row: number;
        column: number;
        index: number;
        error: boolean;
        block: number;
        pencil: number[];
    }[]>>

    selected: number[]

    setSelected: React.Dispatch<React.SetStateAction<number[]>>

}) => {

    var recentValue = -1

    var recentIndex = -1

    var recentRow = -1

    var recentColumn = -1

    function highlightCell(numindex: number, value: number, row: number, column: number) {

        selected = []
        console.log(numindex)

        var relatedRows: number[] = [];

        var relatedColumns: number[] = [];

        currently_selected = [];

        cell.map((cell: any) => {
            if ((cell.index == numindex) && (cell.isPreFilled == false)) {
                cell.isSelected = true;
                cell.isRelated = true;
                currently_selected.push(cell.index)
                if (cell.value != undefined) {
                    relatedRows.push(cell.row)
                    relatedColumns.push(cell.column)
                }
            } else {
                if (value == undefined) {
                    cell.isSelected = false;
                    cell.isRelated = false;
                } else if (cell.value == value) {
                    cell.isRelated = true;
                    relatedRows.push(cell.row)
                    relatedColumns.push(cell.column)
                    cell.isSelected = false;
                } else {
                    cell.isSelected = false;
                    cell.isRelated = false;
                }
            }
        })

        selected = currently_selected
        setCell([...cell])
        highlightRowsandColumns(relatedRows, relatedColumns)
        setSelected([...selected])
        console.log(selected)
    }

    function highlighter() {
        cell.map((cell) => {
            if (selected.includes(cell.index)) {
                cell.isSelected = true;
            } else {
                cell.isSelected = false;
            }
        })
    }

    function highlightRowsandColumns(relatedRows: number[], relatedColumns: number[]) {

        cell.map((cell) => {
            if (relatedRows.includes(cell.row) || relatedColumns.includes(cell.column)) {
                cell.isRelated = true;
            } else {
                cell.isRelated = false;
            }
        })
        setCell([...cell])
    }


    function pencilMarks(value: string) {
        var penc: number[] = []

        if (value == "Backspace" || value == "Delete") {
            cell.map((cell) => {
                if (selected.includes(cell.index)) {
                    cell.pencil = penc
                }
            })
        } else if([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))) {
            cell.map((cell) => {
                if (selected.includes(cell.index)) {
                    penc.push(parseInt(value))
                    cell.pencil = penc
                }
                penc = []
            })
        }
    }

    function InputValue(e: React.KeyboardEvent<SVGGElement>) {
        if (selected.length > 1) {
            console.log("pencilmarks")
            pencilMarks(e.key)
        } else if (selected.length != 0) {
            cell.map((cell) => {
                if (cell.index == selected[0] && cell.isPreFilled == false) {
                    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))) {
                        cell.value = parseInt(e.key)
                        recentColumn = cell.column
                        recentIndex = cell.index
                        recentRow = cell.row
                        recentValue = cell.value
                        errorCheck(cell.index)
                    } else if (e.key == "Backspace" || e.key == "Delete") {
                        cell.value = undefined;
                        cell.error = false;
                    }
                }
            })
        }
        console.log("YOOOOO")
        setCell([...cell])
        console.log(selected)
        console.log(cell)
    }

    // Check if input value is conflicting
    function errorCheck(numindex: number) {

        var err = false

        if (recentValue == -1) {
            console.log("okay")
        } else {
            cell.map((cell: any) => {
                if ((cell.column == recentColumn || cell.row == recentRow) && cell.index != numindex) {
                    if (recentValue == cell.value && recentValue != 0) {
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
                console.log(cell)
                console.log("YAY")
            }
        })

        setCell([...cell])
        recentColumn = -1
        recentIndex = -1
        recentRow = -1
        recentValue = -1
    }

    function mouseClicked(index: number) {
        var sel = []
        sel.push(index)
        mouseIsDown = true
        setSelected([...sel])
        highlighter()
    }

    function mouseMoved(index: number) {
        if (mouseIsDown == true) {
            if (!selected.includes(index)) {
                selected.push(index)
            }
        }
        setSelected([...selected])
        highlighter()
    }

    function mouseReleased(index: number) {
        if (index != 100 && mouseIsDown) {
            mouseIsDown = false;
            if (!selected.includes(index)) {
                selected.push(index)
            }
            setSelected([...selected])
            highlighter()
        } else {
            mouseIsDown = false;
        }
    }

    return (
        <g className="cells" onKeyDown={(e) => InputValue(e)} tabIndex={0} onMouseLeave={() => mouseReleased(100)}>
            {
                cell.map((cell: any) =>

                    <g className="cell-group">
                        <rect className="sudoku-cell"
                            key={cell.index}
                            data-isprefilled={cell.isPreFilled}
                            data-isselected={cell.isSelected}
                            data-isrelated={cell.isRelated}
                            data-row={cell.row}
                            data-column={cell.column}
                            data-error={cell.error}
                            data-index={cell.index}
                            data-isboldtop={cell.isBoldTop}
                            data-isboldbottom={cell.isBoldBottom}
                            data-isboldleft={cell.isBoldLeft}
                            data-isboldright={cell.isBoldRight}

                            x={cell.column * 50}
                            y={cell.row * 50}
                            width="50"
                            height="50"

                            // onMouseDown={() => highlightCell(cell.index, cell.value, cell.row, cell.column)}

                            onMouseDown={() => mouseClicked(cell.index)}
                            onMouseMove={() => mouseMoved(cell.index)}
                            onMouseUp={() => mouseReleased(cell.index)}

                        // create global array, make onmouseover add indices to array 
                        // onmouseup locks the array


                        // onMouseDown sets boolean "click held down" to true, 
                        // onMouseMove checks if it's true, and then adds indices to 
                        // selected array .
                        // onMouseUp sets boolean back to false, and saves the selected list
                        >
                        </rect>
                        <text
                            className="sudoku-numbers"
                            x={(cell.column * 50) + 25}
                            y={(cell.row * 50) + 25}
                            width="50"
                            height="50"
                        >
                            {cell.value}
                        </text>
                        <text
                            className="sudoku-pencilmarks"
                            x={(cell.column * 50) + 25}
                            y={(cell.row * 50) + 25}
                            width="15"
                            height="15"
                        >
                            {cell.pencil[0]}
                        </text>

                    </g>

                )}
        </g>

    )
}



export default SudokuCell;
