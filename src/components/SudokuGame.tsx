import React, { useState } from 'react';
import Grid from './Grid';
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
        row: number
        column: number
        index: number
        error: boolean
        block: number
        pencil: number[]
        isRightClick: boolean
        temporaryValue?:number
    }[],

    selected: number[],

    controls: {
        isShift: boolean
    }
}

function SudokuGrid() {
    // const [cell, setCell] = useState<IState["cell"]>([])
    var lst: number[] = []
    var con:IState["controls"] = {isShift:false}
    

    const [cell, setCell] = useState(CreateArray())
    const [selected, setSelected] = useState(lst)
    const [controls, setControls] = useState(con)
    return (
        <svg className="row" width="500" height="500" viewBox="-50 -50 550 550">
            <SudokuCell controls={controls} setControls={setControls} cell={cell} setCell={setCell} selected={selected} setSelected={setSelected} />
            <Grid></Grid>
        </svg>
    );
}

const InitialControls = () => {

}

const CreateArray = () => {

    var cellarr: IState["cell"] = []

    for (let i = 0; i < 9; i++) {
        var arr = sudoku_test[i]
        for (let j = 0; j < 9; j++) {

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
            var temp = sudoku_test[i][j]
            var isPreFilledk = false;
            
            if (temp == 0) {
                cellarr.push({
                    value: undefined,
                    isPreFilled: isPreFilledk,
                    isSelected: false,
                    isRelated: false,
                    row: i,
                    column: j,
                    index: i * 9 + j,
                    error: false,
                    block: block,
                    pencil:[],
                    isRightClick:false,
                    temporaryValue:undefined
                })
            } else {
                isPreFilledk = true;
                cellarr.push({
                    value: temp,
                    isPreFilled: isPreFilledk,
                    isSelected: false,
                    isRelated: false,
                    row: i,
                    column: j,
                    index: i * 9 + j,
                    error: false,
                    block: block,
                    pencil: [],
                    isRightClick: false,
                    temporaryValue:undefined
                })
            }
        }
    }
    return cellarr
}

export default SudokuGrid;