import React from "react";

import {motion, AnimatePresence} from "framer-motion";

const MouseSelector = ({temporaryValue, column, row, isRightClick}:
    {temporaryValue?:number, column:number, row:number, isRightClick:boolean}) => {

    return(
    <AnimatePresence>
        {isRightClick && (
            <motion.text
                initial={{opacity:0}}
                animate={{opacity:0.6}}
                exit={{opacity:0}}
                className = "mouse-selector"
                x={(column * 50) + 25}
                y={(row * 50) + 25}
                width="50"
                height="50"
            >{temporaryValue}</motion.text>
        )}
    </AnimatePresence>
    )
}

export default MouseSelector;