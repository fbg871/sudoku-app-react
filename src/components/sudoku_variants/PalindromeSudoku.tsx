import React from "react";

const PalindromeSudoku = (
    {isEnd, directionOne, directionTwo}:
    {isEnd:boolean, directionOne:number, directionTwo:number}
    ) => {

    var elem:JSX.Element[] = []

    return(
        <g className="palindrome-cell">
            {elem}
        </g>
    )
}

export default PalindromeSudoku;