import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import SudokuGrid, { IState } from "./SudokuGame";
import { setConstantValue } from 'typescript';

import { generateSolved } from "./SudokuGenerate";
import { clearLine } from 'readline';
import PencilMarks from './PencilMarks';
import SudokuNumbers from './SudokuNumbers';
import MouseSelector from './MouseSelector';
import Variant from './VariantGrid';
import ThermoSudoku from './ThermoSudoku';


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



const SudokuCell = ({ controls, setControls, cell, setCell, selected, setSelected }: {
    cell: IState["cell"]

    setCell: React.Dispatch<React.SetStateAction<IState["cell"]>>

    selected: IState["selected"]

    setSelected: React.Dispatch<React.SetStateAction<IState["selected"]>>

    controls: IState["controls"]

    setControls: React.Dispatch<React.SetStateAction<IState["controls"]>>


}) => {

    const [shift, setShift] = useState(false);

    function shiftUp(key: string) {
        if (key === "Shift") {
            setShift(false);
        }
    }

    function shiftDown(key: string) {
        if (key === "Shift") {
            setShift(true);
        }
    }

    var recentValue = -1

    var recentIndex = -1

    var recentRow = -1

    var recentColumn = -1

    const highlighter = () => {
        cell.map((cell) => {
            if (selected.includes(cell.index) && !cell.isPreFilled) {
                cell.isSelected = true;
            } else {
                cell.isSelected = false;
            }
        })
        setCell([...cell])
    }

    const highlightRelated = (value:number) => {
        if(selected.length === 1){
            cell.map((cell) => {
                if(cell.value === value){
                    cell.isRelated = true
                }else{
                    cell.isRelated = false
                }
            })
        }
        setCell([...cell])
    }

    const pencilMarks = (value: string) => {
        var penc: number[] = []

        if (value == "Backspace" || value == "Delete") {
            cell.map((cell) => {
                if (selected.includes(cell.index)) {
                    cell.pencil = penc
                }
            })
        } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))) {
            cell.map((cell) => {
                if (selected.includes(cell.index)) {
                    if (cell.pencil.includes(parseInt(value))) {
                        cell.pencil.map((pen) => {
                            if (pen !== parseInt(value)) {
                                penc.push(pen)
                            }
                        })
                        cell.pencil = penc
                    } else {
                        penc = cell.pencil
                        penc.push(parseInt(value))
                        cell.pencil = penc
                    }
                }
                penc = []
            })
        }
    }

    const InputValue = (e: React.KeyboardEvent<SVGGElement>) => {

        if (e.key === "Shift") {
            setShift(true);
        }

        if (selected.length > 1) {
            console.log("pencilmarks")
            console.log("e.key: " + e.key)
            pencilMarks(e.key)
        } else if (selected.length != 0 || shift) {
            cell.map((cell) => {
                if (cell.index == selected[0] && cell.isPreFilled == false) {
                    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))) {
                        cell.value = parseInt(e.key)
                        cell.pencil = []
                        recentColumn = cell.column
                        recentIndex = cell.index
                        recentRow = cell.row
                        recentValue = cell.value
                        errorCheck(cell.index)
                        highlightRelated(parseInt(e.key))
                    } else if (e.key == "Backspace" || e.key == "Delete") {
                        deleteValues()
                    }
                }
            })
        }
        console.log("shift " + shift)
        setCell([...cell])
        console.log(selected)
        console.log(cell)
    }

    // Check if input value is conflicting
    const errorCheck = (numindex:number) => {

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

    const deleteValues= () => {
        cell.map((cell) => {
            if (selected.includes(cell.index) && !cell.isPreFilled) {
                cell.value = undefined
                cell.temporaryValue = undefined

                cell.pencil = []
                cell.error = false
            }
            cell.isRelated = false
        })
        setCell([...cell])
    }

    const mouseClicked = (e: React.MouseEvent<SVGRectElement, MouseEvent>, index: number) => {

        // if
        if (selected.includes(index)) {

        }


        if (e.button === 2) {
            cell.map((cell) => {
                if (cell.index === index) {
                    cell.isRightClick = true
                }
            })
        } else if (e.button === 0) {
            mouseIsDown = true
        } else if (e.button === 1) {
            if (selected.includes(index)) {
                deleteValues()
            }
        }


        selected = []
        selected.push(index)
        setSelected([...selected])
        highlighter()
    }

    const mouseMoved = (index: number) => {
        if (mouseIsDown == true) {
            if (!selected.includes(index)) {
                selected.push(index)
            }
        }
        setSelected([...selected])
        highlighter()
    }

    const mouseReleased = (index:number, e?: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        if (e !== undefined) {
            if (e.button !== 1) {
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

                cell.map((cell) => {
                    cell.isRightClick = false
                    if (cell.temporaryValue != undefined && cell.value === undefined) {
                        cell.value = cell.temporaryValue
                        errorCheck(cell.index)
                    }
                })
                setCell([...cell])
            }else{
                deleteValues()
            }
        }
    }


    const incrementTemporary = (e: React.WheelEvent<SVGRectElement>) => {
        if (selected.length === 1) {
            cell.map((cell) => {
                if (cell.isRightClick === true) {
                    if (cell.temporaryValue === undefined) {
                        cell.temporaryValue = 1
                    } else if (e.nativeEvent.deltaY < 0) {
                        if (cell.temporaryValue === 9) {
                            cell.temporaryValue = 1
                        } else {
                            cell.temporaryValue = cell.temporaryValue + 1
                        }
                    } else {
                        if (cell.temporaryValue === 1) {
                            cell.temporaryValue = 9
                        } else {
                            cell.temporaryValue = cell.temporaryValue - 1
                        }
                    }
                }
            })
            setCell([...cell])
        }
        console.log("Scrolling")
    }

    return (
        <g className="cells" onKeyUp={(e) => { shiftUp(e.key) }} onKeyDown={(e) => InputValue(e)} tabIndex={0} onMouseLeave={() => mouseReleased(100, undefined)}>
            {
                cell.map((cell: any) =>
                    <g className="cell-group">
                        <rect className="sudoku-cell"
                            key={cell.index}
                            data-isprefilled={cell.isPreFilled}
                            data-isselected={cell.isSelected}
                            data-isrelated={cell.isRelated}
                            data-isrightclick={cell.isRightClick}
                            data-row={cell.row}
                            data-column={cell.column}
                            data-error={cell.error}
                            data-index={cell.index}

                            x={cell.column * 50}
                            y={cell.row * 50}
                            width="50"
                            height="50"

                            onMouseDown={(e) => mouseClicked(e, cell.index)}
                            onMouseMove={() => mouseMoved(cell.index)}
                            onMouseUp={(e) => mouseReleased(cell.index, e)}

                            onWheel={(e) => incrementTemporary(e)}

                            onContextMenu={(e) => e.preventDefault()}

                        // onMouseDown sets boolean "click held down" to true, 
                        // onMouseMove checks if it's true, and then adds indices to 
                        // selected array .
                        // onMouseUp sets boolean back to false, and saves the selected list
                        >
                        </rect>
                        <SudokuNumbers column={cell.column} row={cell.row} value={cell.value}></SudokuNumbers>
                        <PencilMarks isprefilled={cell.isPreFilled} column={cell.column} row={cell.row} value={cell.pencil} index={cell.index}></PencilMarks>
                        <MouseSelector temporaryValue={cell.temporaryValue} column={cell.column} row={cell.row} isRightClick={cell.isRightClick}></MouseSelector>
                        {/* <Variant column={cell.column} row={cell.row} index={cell.index}></Variant> */}
                        <ThermoSudoku isBulb={cell.thermoSudoku.isBulb} isTip={cell.thermoSudoku.isTip} directionOne={cell.thermoSudoku.directionOne} directionTwo={cell.thermoSudoku.directionTwo} column={cell.column} row={cell.row}></ThermoSudoku>
                    </g>
                )}

        </g>
    )
}

export default SudokuCell;
