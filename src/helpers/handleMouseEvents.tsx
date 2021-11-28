import { IState } from "../components/SudokuGame";
import highlighter from "./highlighter"
import deleteValues from "./deleteValue"
import setValue from "./setValue";
import setPencil from "./setPencil";
import Settings from "../interfaces/Settings";
import React from "react";
import produce from "immer";

const handleMouseEvents = (
    filled:boolean[] ,
    setFilled: React.Dispatch<React.SetStateAction<boolean[]>>,
    settings:Settings,
    eventType: string,
    cellsp: IState["cells"],
    setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>,
    leftClickDown: boolean,
    setLeftClickDown: React.Dispatch<React.SetStateAction<boolean>>,
    selected: IState["selected"],
    setSelected: React.Dispatch<React.SetStateAction<IState["selected"]>>,
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    index: number
) => {


    const cells = cellsp

    if (eventType === "click") {

        // If left button clicked
        if (e.button === 0) {
            setLeftClickDown(true)
            selected = []
            selected.push(index)
            setSelected([...selected])
            highlighter(cells, setCells, selected)
        }

        // If middle button clicked
        else if (e.button === 1) {
            e.preventDefault()
            if (selected.includes(index)) {
                deleteValues(filled, setFilled, cells, setCells, selected)
            }else{
                selected = []
                selected.push(index)
                setSelected([...selected])    
            }
            highlighter(cells, setCells, selected)
        }

        // If right button clicked
        else if (e.button === 2) {
            if (selected.length > 1 && selected.includes(index)) {
                cells.map((cell) => {
                    if (selected.includes(cell.index) && !cell.isPreFilled) {
                        cell.isRightClick = true
                    }
                })
            } else {
                cells.map((cell) => {
                    if (cell.index === index && !cell.isPreFilled) {
                        cell.isRightClick = true
                        if (cell.value !== undefined) {
                            cell.temporaryValue = cell.value
                            cell.value = undefined
                        }

                    }
                })
                selected = []
                selected.push(index)
                setSelected([...selected])
                highlighter(cells, setCells, selected)
            }
            setCells([...cells])
        }
    } else if (eventType === "move") {
        if (leftClickDown) {
            if (!selected.includes(index)) {
                selected.push(index)
            }
            setSelected([...selected])
            highlighter(cells, setCells, selected)
        }
    } else if (eventType === "release") {

        var num = -1
        var tmp = -1

        if (e !== undefined) {
            // If left click is released
            if (e.button === 0) {
                setLeftClickDown(false)
                if (!selected.includes(index) && index != 100) {
                    selected.push(index)
                }
                setSelected([...selected])
                highlighter(cells, setCells, selected)

                cells.map((cell) => {
                    cell.isRightClick = false
                    if (cell.temporaryValue != undefined && cell.value === undefined) {
                        if (num === -1) {
                            num = cell.index
                            tmp = cell.temporaryValue
                        }
                    }
                })

                if (num != -1 && tmp != -1) {
                    setValue(settings, num, cells, setCells, selected, tmp)
                    filled[num] = true
                    setFilled(filled)
                }
                setCells([...cells])

                num = -1
                tmp = -1
            }
            // If middle click is released
            else if (e.button === 1) {
                deleteValues(filled, setFilled, cells, setCells, selected)
            }
            // If right click is released
            else if (e.button === 2) {

                if (selected.length === 1) {
                    cells.map((cell) => {
                        cell.isRightClick = false
                        if (cell.temporaryValue != undefined && cell.value === undefined) {
                            if (num === -1) {
                                num = cell.index
                                tmp = cell.temporaryValue
                            }
                        }
                    })

                    if (num != -1 && tmp != -1) {
                        setValue(settings, num, cells, setCells, selected, tmp)
                        filled[num] = true
                        setFilled(filled)
                    }
                    setCells([...cells])

                    num = -1
                    tmp = -1

                    cells.map((cell) => {
                        cell.isRightClick = false

                    })

                } else if (selected.length > 1) {
                    setPencil(selected, cells, setCells, undefined)
                    cells.map((cell) => {
                        cell.isRightClick = false

                    })
                }
                setSelected([...selected])
                highlighter(cells, setCells, selected)
            }
        }


    }

}

export default handleMouseEvents;