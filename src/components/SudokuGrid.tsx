import React, { useState } from 'react';
import SudokuCell, {currently_selected} from './SudokuCell';


const sudoku_rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const gridlines = [0,1,2,3,4,5,6,7,8,9];

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

export interface IState {
    cell: {
        value?: number
        isPreFilled: boolean
        isSelected: boolean
        isRelated: boolean
        isBoldTop: boolean
        isBoldBottom: boolean
        isBoldLeft: boolean
        isBoldRight: boolean
        row: number
        column: number
        index: number
        error: boolean
        block: number
    }[]
}

function SudokuGrid() {
    // const [cell, setCell] = useState<IState["cell"]>([])
    const [cell, setCell] = useState(CreateArray())
    return (
        <svg className="row" width="500" height="500" viewBox="-50 -50 550 550">
            <SudokuCell cell={cell} setCell={setCell} />
            <g className="grid">
                {gridlines.map((gridlines) => <line fill="none" className="gridline-horizontal" stroke="#000" x1="0" y1={gridlines * 50} x2="450" y2={gridlines * 50} strokeWidth="2" data-row={gridlines + 1} />)}
                {gridlines.map((gridlines) => <line fill="none" className="gridline-vertical" stroke="#000" x1={gridlines * 50} y1="0" x2={gridlines * 50} y2="450" strokeWidth="2" data-column={gridlines + 1} />)}
            </g>
        </svg>
    );
}

// onClick={(e) => console.log(e.clientX)

function CreateArray() {

    // const cellarr = useState<IState["cell"]>([])
    var cellarr: {
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
    }[] = []

    for (let i = 0; i < 9; i++) {
        var arr = sudoku_test[i]
        for (let j = 0; j < 9; j++) {

            var isBoldTopk = false;
            var isBoldBottomk = false;
            var isBoldLeftk = false;
            var isBoldRightk = false;

            var block = undefined;

            if (i < 3) {
                if (j < 3) {
                    block = 1;
                } else if (j < 6) {
                    block = 2
                } else {
                    block = 3
                }
            } else if (i < 6) {
                if (j < 3) {
                    block = 4;
                } else if (j < 6) {
                    block = 5
                } else {
                    block = 6
                }
            } else {
                if (j < 3) {
                    block = 7;
                } else if (j < 6) {
                    block = 8
                } else {
                    block = 9
                }
            }

            if (i == 0 || i == 3 || i == 6) {
                isBoldTopk = true;
            } if (i == 8) {
                isBoldBottomk = true;
            } if (j == 0 || j == 3 || j == 6) {
                isBoldLeftk = true;
            } if (j == 8) {
                isBoldRightk = true;
            }

            var temp = sudoku_test[i][j]
            var isPreFilledk = false;

            if (temp == 0) {
                cellarr.push({
                    value: undefined,
                    isPreFilled: isPreFilledk,
                    isSelected: false,
                    isRelated: false,
                    isBoldTop: isBoldTopk,
                    isBoldBottom: isBoldBottomk,
                    isBoldLeft: isBoldLeftk,
                    isBoldRight: isBoldRightk,
                    row: i,
                    column: j,
                    index: i * 9 + j,
                    error: false,
                    block: block
                })
            } else {
                isPreFilledk = true;
                cellarr.push({
                    value: temp,
                    isPreFilled: isPreFilledk,
                    isSelected: false,
                    isRelated: false,
                    isBoldTop: isBoldTopk,
                    isBoldBottom: isBoldBottomk,
                    isBoldLeft: isBoldLeftk,
                    isBoldRight: isBoldRightk,
                    row: i,
                    column: j,
                    index: i * 9 + j,
                    error: false,
                    block: block
                })
            }
        }
    }
    return cellarr
}

export default SudokuGrid;