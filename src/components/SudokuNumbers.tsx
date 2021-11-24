import React from "react";


// Returns an SVG text element
const SudokuNumbers = ({column, row, value}: 
    {column:number, row:number, value:number}) => {

    return(
        <text
            className="sudoku-numbers"
            x={(column * 50) + 25}
            y={(row * 50) + 25}
            width="50"
            height="50"
        >
            {value}
        </text>
    )
}

export default SudokuNumbers