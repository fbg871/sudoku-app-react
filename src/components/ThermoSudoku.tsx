import React, { memo } from "react";

const ThermoSudoku = ({isBulb, isTip, directionOne, directionTwo, column, row}:{isBulb:boolean, isTip:boolean, directionOne:number, directionTwo:number, column:number, row:number} ) => {

    var elem:JSX.Element[] = []

    if(column === 1 && row === 0){
        console.log("oioimm")
        if(isBulb){
            elem.push(
            <circle
                className="thermo"
                cx={(column * 50) + 25}
                cy={(row * 50) + 25}
                r="18"
            />)
        }else if(isTip){
            elem.push(
                <line 
                    className="thermo"
                    x1={(column*50) + 25}
                    x2={(column*50) + 50}
                    y1={row*50 + 25}
                    y2={row*50 + 25}
                    strokeWidth="15"
                    strokeLinecap="round"
                />
            )
        }
    }
    return(
        <g className="thermo-cell">
            {elem}
        </g>
    )

}


export default ThermoSudoku;