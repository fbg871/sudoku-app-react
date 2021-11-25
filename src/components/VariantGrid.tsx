import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { useState } from 'react';
import { IState as Props } from "./SudokuGame";



// Component that, upon variant = true, generates an array of divs
// overlaying the sudoku grid. This will allow user to see the
// variant restriction (i.e. thermo sudoku elements, killer grids)

// Also returns an array of arrays, showing the cells that share
// a variant restriction (i.e. appear on the same thermo). This
// could be used to generate errors based on the restrictive nature
// of the variant, rather than using the "one true solution" to check
// cell values. Then users can be given the option to use either 
// type of error detection.


// Create new attribute for cell, variantdisplay: "thermo-horizontal" 
// -> a thermo line going horizontal. or "thermo bulb down"-> the bulb
// of the thermo and the direction going down
// Create new object, settings, and have isVariant be a boolean value. 
// Add other settings here too

const Variant = ({index, column, row}: {index:number, column:number, row:number}) => {
    
    var elem:JSX.Element[] = []

    if(index===1){
        elem.push(<circle
            className="thermo"
            cx={(column * 50) + 25}
            cy={(row * 50) + 25}
            r="18"
        />,
        <line
            className = "thermo"
            x1={column*50}
            x2={column*50 + 25}
            y1="25"
            y2="25"
            strokeWidth = "15"
        />)
    }

    return(
        <g
            className = "butthead"
        >
            {elem}
        </g>
    )

}

export default Variant;