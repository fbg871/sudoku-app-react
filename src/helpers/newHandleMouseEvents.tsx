import { IState } from '../components/SudokuGame'
import highlighter from './highlighter'
import deleteValues from './deleteValue'
import setValue from './setValue'
import setPencil from './setPencil'
import Settings from '../interfaces/Settings'
import React from 'react'
import produce from 'immer'
import { setConstantValue } from 'typescript'
import newErrorCheck from './newErrorCheck'
import SudokuState from '../interfaces/SudokuState'
import { off } from 'process'

const newHandleMouseEvents = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	error: boolean,
	setError: React.Dispatch<React.SetStateAction<boolean>>,
	isPreFilled: boolean,
	eventType: string,
	e: React.MouseEvent<SVGRectElement, MouseEvent>,
	index: number
) => {
	let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)

	if (eventType === 'click') {
		// If left button clicked

		if (e.button === 0) {
			sudokuState_copy.leftClickDown = true
			if (!isPreFilled) {
				sudokuState_copy.selected = [index]
				// setSelected([index])
			}
		}

		// If middle button clicked
		else if (e.button === 1) {
			e.preventDefault()
			if (sudokuState.selected.length == 1) {
				if (sudokuState.selected.includes(index) && !isPreFilled) {
					// let values_copy = values.slice()
					// values_copy[index] = undefined

					// setValues(values_copy)

					// let pencil_copy = pencilmarks.map((inner) => inner?.slice())
					// pencil_copy[selected[0]] = undefined

					// setPencilmarks(pencil_copy)

					sudokuState_copy.values[index] = undefined
					sudokuState_copy.pencilmarks[sudokuState.selected[0]] = undefined
				} else if (!isPreFilled) {
					sudokuState_copy.selected = [index]
					// setSelected([index])
				}
			} else if (sudokuState.selected.length > 1) {
				if (sudokuState.selected.includes(index) && !isPreFilled) {
					// let values_copy = values.slice()
					// let pencil_copy = pencilmarks.map((inner) => inner?.slice())
					// for (let i = 0; i < selected.length; i++) {
					// 	values_copy[selected[i]] = undefined
					// 	pencil_copy[selected[i]] = undefined
					// }
					// setValues(values_copy)
					// setPencilmarks(pencil_copy)

					for (let i = 0; i < sudokuState.selected.length; i++) {
						sudokuState_copy.values[sudokuState_copy.selected[i]] = undefined
						sudokuState_copy.pencilmarks[sudokuState_copy.selected[i]] =
							undefined
					}
				} else if (!isPreFilled) {
					// setSelected([index])
					sudokuState_copy.selected = [index]
				}
			}
			setError(false)
		}

		// If right button clicked
		else if (e.button === 2) {
			e.preventDefault()
			if (sudokuState.selected.length > 1) {
				if (sudokuState.selected.includes(index) && !isPreFilled) {
					sudokuState_copy.rightClickDown = sudokuState.selected
					// setRightClickDown(selected)
				} else if (!isPreFilled) {
					// let select_copy: number[] = []
					// select_copy.push(index)
					// setSelected(select_copy)
					// setRightClickDown(select_copy)

					sudokuState_copy.selected = [index]
					sudokuState_copy.rightClickDown = [index]
				}
			} else if (sudokuState.selected.length === 1) {
				if (sudokuState.selected.includes(index)) {
					sudokuState_copy.rightClickDown = sudokuState.selected

					if (sudokuState.values[index] !== undefined && !isPreFilled) {
						sudokuState_copy.temporaryValues[index] = sudokuState.values[index]
						sudokuState_copy.values[index] = undefined
					}

					// setRightClickDown(selected)
					// if (values[index] !== undefined && !isPreFilled) {
					// 	let temp_copy = temporaryValues.slice()
					// 	let vals_copy = values.slice()

					// 	temp_copy[index] = values[index]
					// 	vals_copy[index] = undefined

					// 	setTemporaryValues(temp_copy)
					// 	setValues(vals_copy)
					// }
				} else {
					if (!isPreFilled) {
						// let select_copy: number[] = []
						// select_copy.push(index)
						// setSelected(select_copy)
						// setRightClickDown(select_copy)

						sudokuState_copy.selected = [index]
						sudokuState_copy.rightClickDown = [index]
					}
				}
			}
		}
		setSudokuState(sudokuState_copy)
	} else if (eventType === 'move') {
		if (sudokuState.leftClickDown && !isPreFilled) {
			if (!sudokuState.selected.includes(index)) {
				// let sel = Object.assign([], selected)
				// sel.push(index)
				// setSelected(sel)

				sudokuState_copy.selected.push(index)
				setSudokuState(sudokuState_copy)
			}
		}
	} else if (eventType === 'release') {
		var num = -1
		var tmp = -1

		if (e !== undefined) {
			// If left click is released
			if (e.button === 0) {
				sudokuState_copy.leftClickDown = false
				if (!sudokuState.selected.includes(index) && !isPreFilled) {
					// let sel = selected.slice()
					// sel.push(index)
					// setSelected(sel)

					sudokuState_copy.selected.push(index)
				}
			}
			// If middle click is released
			else if (e.button === 1) {
				// let vals_copy = values.slice()
				// for (let i = 0; i < selected.length; i++) {
				// 	vals_copy[selected[i]] = undefined
				// }
				// setValues(vals_copy)

				for (let i = 0; i < sudokuState.selected.length; i++) {
					// vals_copy[selected[i]] = undefined
					sudokuState_copy.values[sudokuState.selected[i]] = undefined
				}
			}
			// If right click is released
			else if (e.button === 2) {
				sudokuState_copy.rightClickDown = []

				if (sudokuState.selected.length === 1) {
					if (
						sudokuState.temporaryValues[index] !== undefined &&
						sudokuState.values[index] === undefined
					) {
						// let vals_copy = values.slice()
						// let temp_copy = temporaryValues.slice()

						// vals_copy[index] = temporaryValues[index]
						// temp_copy[index] = undefined
						// setValues(vals_copy)
						// setTemporaryValues(temp_copy)
						// newErrorCheck(error, setError, vals_copy, selected)

						sudokuState_copy.values[index] = sudokuState.temporaryValues[index]
						sudokuState_copy.temporaryValues[index] = undefined
					}
				} else if (sudokuState.selected.length > 1) {
					for (let i = 0; i < sudokuState.selected.length; i++) {
						if (
							sudokuState.pencilmarks[sudokuState.selected[i]] === undefined &&
							sudokuState.temporaryValues[sudokuState.selected[i]] !== undefined
						) {
							let penc: number[] | undefined = []
							if (
								sudokuState_copy.temporaryValues[sudokuState.selected[i]] !==
								undefined
							) {
								penc.push(
									sudokuState_copy.temporaryValues[sudokuState.selected[i]]!
								)

								sudokuState_copy.pencilmarks[sudokuState.selected[i]] = penc

								sudokuState_copy.temporaryValues[sudokuState.selected[i]] =
									undefined
								// pencil_copy[selected[i]] = penc
								// temp_copy[selected[i]] = undefined
							}
						} else if (
							sudokuState.pencilmarks[sudokuState.selected[i]] !== undefined &&
							sudokuState.temporaryValues[sudokuState.selected[i]] !== undefined
						) {
							// let existing_pencils = pencilmarks[selected[i]]!.slice()

							// existing_pencils.push(temporaryValues[selected[i]]!)

							sudokuState_copy.pencilmarks[sudokuState.selected[i]]!.push(
								sudokuState.temporaryValues[sudokuState.selected[i]]!
							)

							sudokuState_copy.temporaryValues[sudokuState.selected[i]] =
								undefined

							// pencil_copy[selected[i]] = existing_pencils
							// temp_copy[selected[i]] = undefined
						}
					}
					// setTemporaryValues(temp_copy)
					// setPencilmarks(pencil_copy)
				}
			}
		}
		setSudokuState(sudokuState_copy)
	}
}
export default newHandleMouseEvents
