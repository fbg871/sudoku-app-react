import React from "react";

const Grid = ({}) => {
    var gridElements:JSX.Element[] = []
    var initial = true;

    [0,1,2,3,4,5,6,7,8,9].map((num) => {
        if(initial){
            gridElements = [
            <line 
                key={num}
                fill="none" 
                className="gridline-horizontal" 
                stroke="#000" 
                x1="0" 
                y1={num * 50} 
                x2="450" 
                y2={num * 50} 
                strokeWidth="2" 
                stroke-linecap = "square"
                data-row={num + 1} />,
                <line 
                key={num-1}
                fill="none" 
                className="gridline-vertical" 
                stroke="#000" 
                x1={num * 50} 
                y1="0" 
                x2={num * 50} 
                y2="450" 
                strokeWidth="2" 
                stroke-linecap = "square"
                data-column={num + 1} />
            ]
            initial=false
        }else{
            gridElements.push(<line 
                key={num*3}
                fill="none" 
                className="gridline-horizontal" 
                stroke="#000" 
                x1="0" 
                y1={num * 50} 
                x2="450" 
                y2={num * 50} 
                strokeWidth="2" 
                stroke-linecap = "square"
                data-row={num + 1} />,
                <line 
                key={num*200}
                fill="none" 
                className="gridline-vertical" 
                stroke="#000" 
                x1={num * 50} 
                y1="0" 
                x2={num * 50} 
                y2="450" 
                strokeWidth="2" 
                stroke-linecap = "square"
                data-column={num + 1} />)
        }
    })

    return(
        <g className="grid">
            {gridElements}
        </g>
    )
}

export default Grid;