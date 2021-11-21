import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import { IState as Props } from "./SudokuGrid";






// Create a function that produces a small text element overlaying the top of the cell,
// at a given cell index. Use css to place it in correct spot.


const PencilMarks = ({ column, row, value, index }:
    { column: number, row: number, value: number[], index: number }) => {

    var xpos: number = column * 50
    var ypos: number = row * 50

    var checker = 0

    var textelements: JSX.Element[] = []

    value.map((value) => {
        if (value == 1 || value == 4 || value == 7) {
            xpos = xpos + 7
        } else if (value == 2 || value == 5 || value == 8) {
            xpos = xpos + 22
        } else {
            xpos = xpos + 37
        }

        if (value == 1 || value == 2 || value == 3) {
            ypos = ypos + 15
        } else if (value == 4 || value == 5 || value == 6) {
            ypos = ypos + 29
        } else {
            ypos = ypos + 43
        }

        if(checker == 0){
            textelements=
            [<text
            className="sudoku-pencilmarks"
            x={xpos}
            y={ypos}
            width="15"
            height="15"
        >
            {value}
        </text>]
        checker = 1
        }else{
            textelements.push(
            <text
                className="sudoku-pencilmarks"
                x={xpos}
                y={ypos}
                width="15"
                height="15"
            >
                {value}
            </text>
            )
        }


        xpos = column * 50
        ypos = row * 50
    

    })

    return(
        <g>
        {textelements}
        </g>
    )
}

export default PencilMarks;