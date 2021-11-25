import React from "react";

const ArrowSudoku = ({isCircle, isArrow, directionOne, directionTwo}:
    {isCircle:boolean, isArrow:boolean, directionOne:number, directionTwo:number}) => {
    
    var elem:JSX.Element[] = []

    return(
        <g className="arrow-cell">
            {elem}
        </g>
    )
}

export default ArrowSudoku;