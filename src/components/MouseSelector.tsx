import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import PencilMarks from "./PencilMarks";
import { clearLine } from "readline";

const MouseSelector = ({ index, selected, temporaryValue, column, row, isRightClick }:
    { index: number, selected: number[], temporaryValue?: number, column: number, row: number, isRightClick: boolean }) => {

    var lst: number[] = []

    if (selected.length > 1 && temporaryValue !== undefined) {
        lst.push(temporaryValue)
    }

    if (selected.length === 1) {
        return (
            <AnimatePresence>
                {isRightClick && (
                    <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="mouse-selector"
                        x={(column * 50) + 25}
                        y={(row * 50) + 25}
                        width="50"
                        height="50"
                    >
                        {temporaryValue}
                    </motion.text>
                )}
                {isRightClick && (selected.length > 1) && (
                    <PencilMarks isprefilled={false} column={column} row={row} value={lst} index={index}></PencilMarks>
                )}
            </AnimatePresence>
        )
    }else if(selected.length > 1 && isRightClick){
        return(
            <PencilMarks isprefilled={false} column={column} row={row} value={lst} index={index}></PencilMarks>
        )
    }else{
        return(<g className="mouse-selector"></g>)
    }
}

export default MouseSelector;