import { IState } from "../components/SudokuGame";
import highlighter from "./highlighter"
import deleteValues from "./deleteValue"
import setValue from "./setValue";
import setPencil from "./setPencil";
import Settings from "../interfaces/Settings";
import React from "react";
import produce from "immer";
import { setConstantValue } from "typescript";

const newHandleMouseEvents = (

    pencilmarks: (number[] | undefined)[],
    setPencilmarks: React.Dispatch<React.SetStateAction<(number[] | undefined)[]>>,

    isPreFilled: boolean,

    temporaryValues: (number | undefined)[],
    setTemporaryValues: React.Dispatch<React.SetStateAction<(number | undefined)[]>>,

    values: (number | undefined)[],
    setValues: React.Dispatch<React.SetStateAction<(number | undefined)[]>>,

    eventType: string,
    leftClickDown: boolean,
    setLeftClickDown: React.Dispatch<React.SetStateAction<boolean>>,
    rightClickDown: number[],
    setRightClickDown: React.Dispatch<React.SetStateAction<number[]>>,

    selected: IState["selected"],
    setSelected: React.Dispatch<React.SetStateAction<IState["selected"]>>,
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    index: number
) => {


    if (eventType === "click") {

        // If left button clicked
        if (e.button === 0) {
            setLeftClickDown(true)
            if (!isPreFilled) {
                setSelected([index])
            }
        }

        // If middle button clicked
        else if (e.button === 1) {
            e.preventDefault()
            if (selected.length == 1) {
                if (selected.includes(index) && !isPreFilled) {
                    let values_copy = values.slice()
                    values_copy[index] = undefined

                    setValues(values_copy)

                    let pencil_copy = pencilmarks.map(inner => inner?.slice())
                    pencil_copy[selected[0]] = undefined
                    
                    setPencilmarks(pencil_copy)

                } else if (!isPreFilled) {
                    setSelected([index])
                }
            } else if (selected.length > 1) {
                if (selected.includes(index) && !isPreFilled) {
                    for (let i = 0; i < selected.length; i++) {
                        let values_copy = values.slice()
                        values_copy[selected[i]] = undefined
                        setValues(values_copy)

                        let pencil_copy = pencilmarks.map(inner => inner?.slice())
                        pencil_copy[selected[i]] = undefined
                        setPencilmarks(pencil_copy)
                    
                    
                    }
                }
            }
        }

        // If right button clicked
        else if (e.button === 2) {
            e.preventDefault()
            if (selected.length > 1) {
                if (selected.includes(index)) {
                    setRightClickDown(selected)
                } else {
                    setSelected([index])
                    setRightClickDown(selected)
                }
            } else if (selected.length === 1) {
                if (selected.includes(index)) {
                    setRightClickDown(selected)
                    if (values[index] !== undefined && !isPreFilled) {

                        let temp_copy = temporaryValues.slice()
                        let vals_copy = values.slice()

                        temp_copy[index] = values[index]
                        vals_copy[index] = undefined

                        setTemporaryValues(temp_copy)
                        setValues(vals_copy)
                    }
                } else {
                    setSelected([index])
                    setRightClickDown(selected)
                }
            }
        }
    } else if (eventType === "move") {
        if (leftClickDown && !isPreFilled) {
            if (!selected.includes(index)) {
                let sel = Object.assign([], selected)
                sel.push(index)
                setSelected(sel)
            }
        }
    } else if (eventType === "release") {

        var num = -1
        var tmp = -1

        if (e !== undefined) {
            // If left click is released
            if (e.button === 0) {
                setLeftClickDown(false)
                if (!selected.includes(index) && index != 100) {
                    let sel = Object.assign([], selected)
                    sel.push(index)
                    setSelected(sel)
                }
            }
            // If middle click is released
            else if (e.button === 1) {
                let vals_copy = values.slice()
                for (let i = 0; i < selected.length; i++) {
                    vals_copy[selected[i]] = undefined
                }
                setValues(vals_copy)
            }
            // If right click is released
            else if (e.button === 2) {
                setRightClickDown([])

                if (selected.length === 1) {
                    if (temporaryValues[index] !== undefined && values[index] === undefined) {

                        let vals_copy = values.slice()
                        let temp_copy = temporaryValues.slice()

                        vals_copy[index] = temporaryValues[index]
                        temp_copy[index] = undefined
                        setValues(vals_copy)
                        setTemporaryValues(temp_copy)
                    }

                } else if (selected.length > 1) {
                    let pencil_copy = pencilmarks.map(inner => inner?.slice())
                    for (let i = 0; i < selected.length; i++) {
                        if (pencilmarks[selected[i]] === undefined) {
                            let penc: number[] = []
                            if (temporaryValues[selected[i]] !== undefined) {
                                penc.push(temporaryValues[selected[i]]!)
                                pencil_copy[selected[i]] = penc
                            }
                        }else{
                            let existing_pencils = pencilmarks[selected[i]]!.slice()
                            if(temporaryValues[selected[i]] !== undefined){
                                existing_pencils.push(temporaryValues[selected[i]]!)
                                pencil_copy[selected[i]] = existing_pencils
                            }
                            
                        }
                    }
                    setPencilmarks(pencil_copy)
                }
            }

        }
    }
}
export default newHandleMouseEvents;