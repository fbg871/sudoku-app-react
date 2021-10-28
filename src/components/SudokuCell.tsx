import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import { IState as Props } from "./SudokuGrid";

const row = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

interface IProps {
    cell: Props["cell"]
    setCell: React.Dispatch<React.SetStateAction<Props["cell"]>>
}


const SudokuCell: React.FC<IProps> = ({ cell, setCell }) => {

    const [input, setInput] = useState({
        isPreFilled: false,
        isSelected: false,
        isRelated: false,
        value: ""
    })


    function highlightCell(numindex: number) {
        cell.map((cell) => {
            if (cell.index == numindex) {
                cell.isSelected = true;
            }
        }
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, numindex: number): void => {

        const updatedCells: React.SetStateAction<{ value?: number | undefined; isPreFilled: boolean; isSelected: boolean; isRelated: boolean; isBoldTop: boolean; isBoldBottom: boolean; isBoldLeft: boolean; isBoldRight: boolean; row: number; column: number; index: number; }[]> = [];

        if (e.target.value.length > parseInt(e.target.max,10)) {
            e.target.value = e.target.value.slice(0, parseInt(e.target.max,10))
        }
        if (parseInt(e.target.value) <= 0) {
            e.target.value = ""
        }

        cell.map((cell) => {
            if (cell.index == numindex) {
                const newCell = cell;

                if (e.target.value.length > parseInt(e.target.max,10)) {
                    newCell.value = parseInt(e.target.value.slice(0, parseInt(e.target.max,10)))
                }
                if (parseInt(e.target.value) <= 0) {
                    newCell.value = cell.value
                }

                newCell.value = parseInt(e.target.value)
                updatedCells.push(newCell)
            }else{
                updatedCells.push(cell)
            }

        })

        setCell(updatedCells)
    }


    const maxLengthCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > parseInt(e.target.max,10)) {
            e.target.value = e.target.value.slice(0, parseInt(e.target.max,10))
        }
        if (parseInt(e.target.value) <= 0) {
            e.target.value = ""
        }
    }

    return (
        // <div>
        //     {
        //         row.map((rowIndex) =>
        <div className="row" data-row-index={0}>
            {
                cell.map((cell) =>
                    <div className="sudoku-cell"
                        key={cell.index}
                        data-isPreFilled={cell.isPreFilled}
                        data-isSelected={cell.isSelected}
                        data-isRelated={cell.isRelated}
                        data-row={cell.row}
                        data-column={cell.column}
                        data-index={cell.index}
                        data-isboldtop={cell.isBoldTop}
                        data-isboldbottom={cell.isBoldBottom}
                        data-isboldleft={cell.isBoldLeft}
                        data-isboldright={cell.isBoldRight}
                        onClick={() => highlightCell(cell.index)}
                    >
                        <input
                            className="cell-input"
                            type="number"
                            data-id={cell.index}
                            onInput={maxLengthCheck}
                            onChange={(e) => handleChange(e, cell.index)}
                            defaultValue={cell.value}></input>
                    </div>)
            }
        </div>
        //         )
        //     }
        // </div>
    )
}



export default SudokuCell;