import React, { useState, useEffect } from 'react';
import { IState } from "./SudokuGame";
import PencilMarks from './PencilMarks';
import SudokuNumbers from './SudokuNumbers';
import MouseSelector from './MouseSelector';
import Variant from './VariantGrid';
import handleKeyboardInput from '../helpers/handleKeyboardInput';
import SudokuCell from './SudokuCell';

// interface IProps {
//     cell: Props["cell"]
//     // setCell: React.Dispatch<React.SetStateAction<Props["cell"]>>
// }



const SudokuBoard = ({ controls, setControls, cells, setCells, settings}: {
    cells: IState["cells"]
    setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>

    controls: IState["controls"]
    setControls: React.Dispatch<React.SetStateAction<IState["controls"]>>

    settings: IState["settings"]
}) => {

    var lst: number[] = []

    const [selected, setSelected] = useState(lst)
    const [leftClickDown, setLeftClickDown] = useState(false)

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
