import { motion } from "framer-motion";
import React, { useState } from "react";
import incrementTemporary from "../helpers/incrementTemporary";
import newHandleMouseEvents from "../helpers/newHandleMouseEvents";
import newIncrementTemporary from "../helpers/newIncrementTemporary";
import Cell from "../interfaces/Cell";
import Settings from "../interfaces/Settings";
import NewPencilMarks from "./NewPencilMarks";
import { IState } from "./SudokuGame";
import TemporaryPencilmarks from "./TemporaryPencilmarks";

const NewSudokuCell = ({ pencilmarks, setPencilmarks, temporaryValues, setTemporaryValues, leftClickDown, setLeftClickDown, rightClickDown, setRightClickDown, selected, setSelected, index, values, setValues, filled, setFilled}:
    {
        pencilmarks: (number[] | undefined)[],
        setPencilmarks: React.Dispatch<React.SetStateAction<(number[] | undefined)[]>>,

        temporaryValues: (number | undefined)[],
        setTemporaryValues: React.Dispatch<React.SetStateAction<(number | undefined)[]>>,

        leftClickDown: boolean,
        setLeftClickDown: React.Dispatch<React.SetStateAction<boolean>>,

        rightClickDown: number[],
        setRightClickDown: React.Dispatch<React.SetStateAction<number[]>>,

        selected: number[],
        setSelected: React.Dispatch<React.SetStateAction<number[]>>,

        index: number,
        values: (number | undefined)[],
        setValues: React.Dispatch<React.SetStateAction<(number | undefined)[]>>,
        filled: boolean[],
        setFilled: React.Dispatch<React.SetStateAction<boolean[]>>
        }
) => {

    // Pass index, value to this component. don't make state

    // maybe best to create helper function to extract col, row
    // info from just the index

    var pref: boolean = false

    if (values[index] !== undefined) {
        pref = true
    }

    const [isPreFilled, setPreFilled] = useState(pref)
    const [isRelated, setRelated] = useState(false)
    const [error, setError] = useState(false)


    return (
        <g className="cell-group">
            <rect className="sudoku-cell"
                // key={cell.index}
                data-isprefilled={isPreFilled}
                data-isselected={selected.includes(index)}
                data-isrelated={isRelated}
                data-isrightclick={rightClickDown.includes(index)}
                data-error={error}
                data-index={index}

                x={(Math.floor(index/9)) * 50}
                y={(index%9) * 50}
                width="50"
                height="50"

                onMouseDown={(e) => newHandleMouseEvents(pencilmarks, setPencilmarks, isPreFilled, temporaryValues, setTemporaryValues, values, setValues, "click", leftClickDown, setLeftClickDown, rightClickDown, setRightClickDown, selected, setSelected, e, index)}
                onMouseMove={(e) => newHandleMouseEvents(pencilmarks, setPencilmarks, isPreFilled, temporaryValues, setTemporaryValues, values, setValues, "move", leftClickDown, setLeftClickDown, rightClickDown, setRightClickDown, selected, setSelected, e, index)}
                onMouseUp={(e) => newHandleMouseEvents(pencilmarks, setPencilmarks, isPreFilled, temporaryValues, setTemporaryValues, values, setValues, "release", leftClickDown, setLeftClickDown, rightClickDown, setRightClickDown, selected, setSelected, e, index)}

                onWheel={(e) => newIncrementTemporary(e, rightClickDown, temporaryValues, setTemporaryValues)}

                onContextMenu={(e) => e.preventDefault()}

            />
            <text
                className="sudoku-numbers"
                x={(Math.floor(index/9) * 50) + 25}
                y={((index%9) * 50) + 25}
                width="50"
                height="50"
            >
                {values[index]}
            </text>
            {rightClickDown.includes(index) && (selected.length===1) && (
                <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    className="mouse-selector"
                    x={(Math.floor(index/9) * 50) + 25}
                    y={((index%9) * 50) + 25}
                    width="50"
                    height="50"
                >
                    {temporaryValues[index]}
                </motion.text>
            )}
            {rightClickDown.includes(index) && (selected.length > 1) && (
                
                <TemporaryPencilmarks index = {index} isprefilled={isPreFilled} pencilmarks={pencilmarks} setPencilmarks={setPencilmarks} temporaryValues={temporaryValues[index]}/>

                // <NewPencilMarks  isprefilled = {isPreFilled} column={index % 9} row={index % 9} pencilmarks={pencilmarks} setPencilmarks={setPencilmarks} index={index}/>
            )}
            <NewPencilMarks  isprefilled = {isPreFilled} pencilmarks={pencilmarks} setPencilmarks={setPencilmarks} index={index}/>
 
        </g>
    )
}

export default NewSudokuCell;