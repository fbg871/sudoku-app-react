import React, { useState } from 'react';
import SudokuCell from './SudokuCell';

const sudoku_rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
    }[]
}



function SudokuGrid() {
    // const [cell, setCell] = useState<IState["cell"]>([])

    const [cell, setCell] = useState(CreateArray())

    return (
        <div className="SudokuGrid">
            {
                <SudokuCell cell={cell} setCell={setCell} />
            }
        </div>
    );
}

function CreateArray() {

    // const cellarr = useState<IState["cell"]>([])
    var cellarr = []

    for (let i = 0; i < 9; i++) {
        var arr = sudoku_test[i]
        for (let j = 0; j < 9; j++) {

            var isBoldTopk = false;
            var isBoldBottomk = false;
            var isBoldLeftk = false;
            var isBoldRightk = false;

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
                    error: false
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
                    error: false
                })
            }
        }
    }
    return cellarr
}

export default SudokuGrid;