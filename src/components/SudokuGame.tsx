import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import SudokuBoard from './SudokuBoard';
import ThermoSudoku from './ThermoSudoku';

import Cell from '../interfaces/Cell';
import Settings from '../interfaces/Settings';

import { sudoku_test, solved_test } from '../helpers/sudoku_text';


const sudoku_rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const gridlines = [0,1,2,3,4,5,6,7,8,9];

export interface IState {
    cells: Cell[],
    selected: number[],
    controls: {
        isShift: boolean
    },
    settings: Settings
}

const SudokuGrid = () => {
    var lst: number[] = []
    var con:IState["controls"] = {isShift:false}

    var set:IState["settings"] = {
        isThermo:true,
        isArrow:false,
        isPalindrome:false,
        errorCheckType:false,
        highlightRelated:false    
    }

    const [cells, setCells] = useState(CreateArray())


    const [selected, setSelected] = useState(lst)
    const [controls, setControls] = useState(con)

    const [settings, setSettings] = useState(set)

    return (
        <svg className="sudoku-game" width="500" height="500" viewBox="-50 -50 550 550">
            <SudokuBoard controls={controls} setControls={setControls} cells={cells} setCells={setCells} selected={selected} setSelected={setSelected} settings={settings}/>
            <Grid/>
        </svg>
    );
}

const CreateArray = () => {

    var cellarr: IState["cells"] = []

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
                    temporaryValue:undefined,
                    thermoSudoku:{
                        isBulb:false,
                        isTip:false,
                        directionOne:1,
                        directionTwo:2
                    },
                    arrowSudoku: {
                        isCircle:false,
                        isArrow:false,
                        directionOne:1,
                        directionTwo:2
                    },
                    palindromeSudoku: {
                        isEnd:false,
                        directionOne:2,
                        directionTwo:3
                    }
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
                    temporaryValue:undefined,
                    thermoSudoku:{
                        isBulb:false,
                        isTip:true,
                        directionOne:1,
                        directionTwo:2
                    },
                    arrowSudoku: {
                        isCircle:false,
                        isArrow:false,
                        directionOne:1,
                        directionTwo:2
                    },
                    palindromeSudoku: {
                        isEnd:false,
                        directionOne:1,
                        directionTwo:2
                    }
                })
            }
        }
    }
    return cellarr
}

export default SudokuGrid;