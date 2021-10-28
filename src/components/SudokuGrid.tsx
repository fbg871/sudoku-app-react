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
    }[]
}



function SudokuGrid() {
    // const [cell, setCell] = useState<IState["cell"]>([])


    const list = CreateArray()

    const [cell, setCell] = useState(CreateArray())


    return (
        <div className="SudokuGrid">

            {
                <SudokuCell cell={cell} setCell = {setCell} />
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
                    index: i * 9 + j
                })
            }else {
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
                    index: i * 9 + j
                })
            }

            // const cl = {
            //     value: sudoku_test[i][j],
            //     isPreFilled: false,
            //     isSelected: false,
            //     isRelated: false,
            //     row: i,
            //     column: j,
            //     index: i * 9 + j
            // }

            // cellarr.push({
            //     value: tempi,
            //     isPreFilled: isPreFilledk,
            //     isSelected: false,
            //     isRelated: false,
            //     isBoldTop: isBoldTopk,
            //     isBoldBottom: isBoldBottomk,
            //     isBoldLeft: isBoldLeftk,
            //     isBoldRight: isBoldRightk,
            //     row: i,
            //     column: j,
            //     index: i * 9 + j
            // })
        }
    }
    return cellarr
}

export default SudokuGrid;