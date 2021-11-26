import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState, useEffect } from 'react';
import SudokuGrid, { IState } from "./SudokuGame";
import { setConstantValue } from 'typescript';

import { generateSolved } from "./SudokuGenerate";
import { clearLine } from 'readline';
import PencilMarks from './PencilMarks';
import SudokuNumbers from './SudokuNumbers';
import MouseSelector from './MouseSelector';
import Variant from './VariantGrid';
import ThermoSudoku from './ThermoSudoku';
import setValue from '../helpers/setValue';
import deleteValues from '../helpers/deleteValue';
import { info } from 'console';
import setPencil from '../helpers/setPencil';
import incrementTemporary from '../helpers/incrementTemporary';
import handleKeyboardInput from '../helpers/handleKeyboardInput';
import SudokuCell from './SudokuCell';

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



const SudokuBoard = ({ controls, setControls, cells, setCells, selected, setSelected, settings}: {
    cells: IState["cells"]
    setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>

    selected: IState["selected"]
    setSelected: React.Dispatch<React.SetStateAction<IState["selected"]>>

    controls: IState["controls"]
    setControls: React.Dispatch<React.SetStateAction<IState["controls"]>>

    settings: IState["settings"]
}) => {

    const [leftClickDown, setLeftClickDown] = useState(false);

    var elem:JSX.Element[] = []

    cells.map((cell)=> {
        elem.push(
            <g className="cell-group" key={cell.index}>
                <SudokuCell rectCell = {cell} selected={selected} setSelected={setSelected} cells = {cells} setCells = {setCells} leftClickDown={leftClickDown} setLeftClickDown={setLeftClickDown} />
                <Variant cell={cell} isThermo={settings.isThermo} isArrow={settings.isArrow} isPalindrome={settings.isPalindrome}></Variant>
                <SudokuNumbers column={cell.column} row={cell.row} value={cell.value}></SudokuNumbers>
                <PencilMarks isprefilled={cell.isPreFilled} column={cell.column} row={cell.row} value={cell.pencil} index={cell.index}></PencilMarks>
                <MouseSelector index={cell.index} selected={selected} temporaryValue={cell.temporaryValue} column={cell.column} row={cell.row} isRightClick={cell.isRightClick}></MouseSelector>
            </g>)
    })
    return (
        <g className="cells" onKeyDown={(e) => handleKeyboardInput(e, selected, setSelected, cells, setCells)} tabIndex={0} 
        // onMouseLeave={() => mouseReleased(100, undefined)}
        >
            {elem}
        </g>
    )
}

export default SudokuBoard;
