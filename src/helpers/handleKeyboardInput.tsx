import React from "react";
import { IState } from "../components/SudokuGame";
import highlighter from "./highlighter";
import setValue from "./setValue";
import setPencil from "./setPencil";
import deleteValues from "./deleteValue";
import Settings from "../interfaces/Settings";

const handleKeyboardInput = (
    filled: boolean[], 
    setFilled:React.Dispatch<React.SetStateAction<boolean[]>>,
    settings:Settings,
    event: React.KeyboardEvent<SVGGElement>,
    selected:IState["selected"],
    setSelected:React.Dispatch<React.SetStateAction<IState["selected"]>>,

    cells:IState["cells"], 
    setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>,


) => {
    if (selected.length > 1) {
        if([1,2,3,4,5,6,7,8,9].includes(parseInt(event.key))){
            // pencilMarks(eventkey)
            setPencil(selected, cells, setCells, event)
        } else if(event.key == "Backspace" || event.key == "Delete"){
            deleteValues(filled, setFilled, cells, setCells, selected)
        }

    } else if (selected.length === 1 ) {

        if([1,2,3,4,5,6,7,8,9].includes(parseInt(event.key))){
            setValue(settings, selected[0], cells, setCells, selected, parseInt(event.key))
            filled[selected[0]] = true
            setFilled(filled)
        } else if(event.key == "Backspace" || event.key == "Delete"){
            deleteValues(filled, setFilled, cells, setCells, selected)
        }
        if( event.key === "ArrowUp"){
            event.preventDefault()
            var sel = selected[0]
            if(sel>9){
                sel = sel-9
            }
            selected = []
            selected.push(sel)
            setSelected([...selected])
            highlighter(cells, setCells, selected)
        }else if( event.key === "ArrowDown"){
            event.preventDefault()
            var sel = selected[0]
            if(sel<72){
                sel = sel + 9
            }
            selected = []
            selected.push(sel)
            setSelected([...selected])
            highlighter(cells, setCells, selected)
        } else if(event.key === "ArrowRight"){
            event.preventDefault()
            var sel = selected[0]
            if(((sel+1) % 9) != 0 ){
                sel = sel + 1
            }
            selected = []
            selected.push(sel)
            setSelected([...selected])
            highlighter(cells, setCells, selected)
        } else if(event.key === "ArrowLeft"){
            event.preventDefault()
            var sel = selected[0]
            if(((sel+9) % 9) != 0 ){
                sel = sel - 1
            }
            selected = []
            selected.push(sel)
            setSelected([...selected])
            highlighter(cells, setCells, selected)

        }
    }
    setCells([...cells])  
}

export default handleKeyboardInput;