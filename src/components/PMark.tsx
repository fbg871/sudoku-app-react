import React from "react";

const PMark = ({value, xpos, ypos}:{value:number, xpos:number, ypos:number}) => {
    return(
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

export default PMark;