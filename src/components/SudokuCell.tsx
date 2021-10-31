import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import SudokuGrid, { IState as Props } from "./SudokuGrid";
import blockInvalid from "./blockInvalid"
import { setConstantValue } from 'typescript';

import {generateSolved} from "./SudokuGenerate";

const row = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const valid_inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9];



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


const SudokuCell = ({ cell, setCell }: {
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
        block:number;
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
    }[]>>
}) => {

    var recentValue = -1

    var recentIndex = -1

    var recentRow = -1

    var recentColumn = -1

    function highlightCell(numindex: number, value: number, row: number, column: number) {

        var relatedRows: number[] = [];

        var relatedColumns: number[] = [];

        cell.map((cell: any) => {
            if (cell.index == numindex) {
                cell.isSelected = true;
                cell.isRelated = true;
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


        setCell([...cell])
        highlightRowsandColumns(relatedRows, relatedColumns)
    }

    function highlightRowsandColumns(relatedRows: number[], relatedColumns: number[]) {

        cell.map((cell) => {
            if (relatedRows.includes(cell.row) || relatedColumns.includes(cell.column)) {
                cell.isRelated = true;
            } else {
                cell.isRelated = false;
            }
        })
    }



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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, numindex: number): void => {

        const updatedCells: React.SetStateAction<{ value?: number | undefined; isPreFilled: boolean; isSelected: boolean; isRelated: boolean; isBoldTop: boolean; isBoldBottom: boolean; isBoldLeft: boolean; isBoldRight: boolean; row: number; column: number; index: number; error: boolean; block: number }[]> = [];


        cell.map((cell: any) => {
            if (cell.index == numindex) {
                const newCell = cell;

                if (valid_inputs.includes(parseInt(e.target.value))) {
                    newCell.value = parseInt(e.target.value)
                    recentValue = newCell.value
                    recentIndex = newCell.index
                    recentRow = newCell.row
                    recentColumn = newCell.column

                } else {

                    newCell.value = 0
                    e.target.value = ""
                }
                // newCell.value = parseInt(e.target.value)
                updatedCells.push(newCell)
                if (cell.value == "") {
                    cell.error = false
                    console.log(cell)
                }
            } else {
                updatedCells.push(cell)
            }


        })

        // setCell(updatedCells)
        errorCheck(numindex)
        generateSolved();
    }

    // const checkKey = (e: { key: string; preventDefault: () => any; }) => {
    //     blockInvalid;
    //     if(e.key)
    // }


    const maxLengthCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > parseInt(e.target.max, 10)) {
            e.target.value = e.target.value.slice(0, parseInt(e.target.max, 10))
        }
        if (parseInt(e.target.value) <= 0) {
            e.target.value = ""
        }
    }

    return (
        <div className="row" data-row-index={0}>
            {
                cell.map((cell: any) =>
                    <div className="sudoku-cell"
                        key={cell.index}
                        data-isPreFilled={cell.isPreFilled}
                        data-isSelected={cell.isSelected}
                        data-isRelated={cell.isRelated}
                        data-row={cell.row}
                        data-column={cell.column}
                        data-error={cell.error}
                        data-index={cell.index}
                        data-isboldtop={cell.isBoldTop}
                        data-isboldbottom={cell.isBoldBottom}
                        data-isboldleft={cell.isBoldLeft}
                        data-isboldright={cell.isBoldRight}
                    >
                        <input
                            className="cell-input"
                            type="number"
                            max="1"
                            data-id={cell.index}
                            data-isselected={cell.isSelected}
                            data-error={cell.error}
                            onClick={() => highlightCell(cell.index, cell.value, cell.row, cell.column)}
                            onInput={maxLengthCheck}
                            onChange={(e) => handleChange(e, cell.index)}
                            onKeyDown={blockInvalid}
                            defaultValue={cell.value}></input>
                    </div>)
            }
        </div>

    )
}



export default SudokuCell;