import React from 'react'
import SudokuState from '../interfaces/SudokuState'
// import newErrorCheck from './newErrorCheck'

export const handleMouseClick = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.MouseEvent<SVGRectElement, MouseEvent>,
	index: number
) => {
	let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)

	// If left button clicked
	if (event.button === 0) {
		if (
			(event.shiftKey || event.ctrlKey) &&
			!sudokuState_copy.selected.includes(index)
		) {
			sudokuState_copy.leftClickDown = true
			sudokuState_copy.selected.push(index)
		} else {
			sudokuState_copy.leftClickDown = true

			sudokuState_copy.selected = [index]
		}
	}

	// If middle button clicked
	else if (event.button === 1) {
		event.preventDefault()
		if (sudokuState.selected.length === 1) {
			if (
				sudokuState.selected.includes(index) &&
				!sudokuState.preFilled[sudokuState.selected[0]]
			) {
				sudokuState_copy.values[index] = undefined
				sudokuState_copy.pencilmarks[sudokuState.selected[0]] = undefined
			} else if (!sudokuState.preFilled[index]) {
				sudokuState_copy.selected = [index]
			}
		} else if (sudokuState.selected.length > 1) {
			if (sudokuState.selected.includes(index)) {
				for (let i = 0; i < sudokuState.selected.length; i++) {
					if (!sudokuState.preFilled[sudokuState.selected[i]]) {
						sudokuState_copy.values[sudokuState.selected[i]] = undefined
						sudokuState_copy.pencilmarks[sudokuState.selected[i]] = undefined
					}
				}
			} else if (!sudokuState.preFilled[index]) {
				sudokuState_copy.selected = [index]
			}
		}
	}

	// If right button clicked
	else if (event.button === 2) {
		event.preventDefault()
		if (sudokuState.selected.length > 1) {
			if (sudokuState.selected.includes(index)) {
				// for (let i = 0; i < sudokuState.selected.length; i++) {
				// 	if ((i = 0)) {
				// 		sudokuState.rightClickDown = []
				// 	}
				// 	if (!sudokuState.preFilled[sudokuState.selected[i]]) {
				// 		sudokuState.rightClickDown.push(sudokuState.selected[i])
				// 	}
				// }
				sudokuState_copy.rightClickDown = sudokuState.selected
			} else if (!sudokuState.preFilled[index]) {
				sudokuState_copy.selected = [index]
				sudokuState_copy.rightClickDown = [index]
			}
		} else if (
			sudokuState.selected.length === 1 &&
			!sudokuState.preFilled[sudokuState.selected[0]]
		) {
			if (sudokuState.selected.includes(index)) {
				sudokuState_copy.rightClickDown = sudokuState.selected

				if (
					sudokuState.values[index] !== undefined &&
					!sudokuState.preFilled[index]
				) {
					sudokuState_copy.temporaryValues[index] = sudokuState.values[index]
					sudokuState_copy.values[index] = undefined
				}
			} else {
				if (!sudokuState.preFilled[index]) {
					sudokuState_copy.selected = [index]
					sudokuState_copy.rightClickDown = [index]
				}
			}
		}
	}
	setSudokuState(sudokuState_copy)
}

export const handleMouseMove = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.MouseEvent<SVGRectElement, MouseEvent>,
	index: number
) => {
	let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)

	if (sudokuState.leftClickDown && !sudokuState.preFilled[index]) {
		if (!sudokuState.selected.includes(index)) {
			sudokuState_copy.selected.push(index)
			setSudokuState(sudokuState_copy)
		}
	}
}

export const handleMouseRelease = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.MouseEvent<SVGRectElement, MouseEvent>,
	index: number
) => {
	let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)

	// If left click is released
	if (event.button === 0) {
		sudokuState_copy.leftClickDown = false
		if (!sudokuState.selected.includes(index) && !sudokuState.preFilled[index]) {
			sudokuState_copy.selected.push(index)
		}
	}
	// If middle click is released
	else if (event.button === 1) {
		for (let i = 0; i < sudokuState.selected.length; i++) {
			if (!sudokuState.preFilled[sudokuState.selected[i]]) {
				sudokuState_copy.values[sudokuState.selected[i]] = undefined
				sudokuState_copy.pencilmarks[sudokuState.selected[i]] = undefined
				sudokuState_copy.error[i] = false
			}
		}
	}
	// If right click is released
	else if (event.button === 2) {
		sudokuState_copy.rightClickDown = []

		if (sudokuState.selected.length === 1) {
			if (
				sudokuState.temporaryValues[index] !== undefined &&
				sudokuState.values[index] === undefined
			) {
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
						sudokuState_copy.temporaryValues[sudokuState.selected[i]] !== undefined
					) {
						penc.push(sudokuState_copy.temporaryValues[sudokuState.selected[i]]!)

						sudokuState_copy.pencilmarks[sudokuState.selected[i]] = penc

						sudokuState_copy.temporaryValues[sudokuState.selected[i]] = undefined
					}
				} else if (
					sudokuState.pencilmarks[sudokuState.selected[i]] !== undefined &&
					sudokuState.temporaryValues[sudokuState.selected[i]] !== undefined
				) {
					if (
						sudokuState.pencilmarks[sudokuState.selected[i]]!.includes(
							sudokuState.temporaryValues[sudokuState.selected[i]]!
						)
					) {
						let pencil_copy =
							sudokuState_copy.pencilmarks[sudokuState.selected[i]]!.slice()
						let index_for_removal = pencil_copy.indexOf(
							sudokuState.temporaryValues[sudokuState.selected[i]]!
						)
						if (index_for_removal > -1) {
							pencil_copy.splice(index_for_removal, 1)
						}

						sudokuState_copy.pencilmarks[sudokuState.selected[i]] = pencil_copy
						sudokuState_copy.temporaryValues[sudokuState.selected[i]] = undefined
					} else {
						sudokuState_copy.pencilmarks[sudokuState.selected[i]]!.push(
							sudokuState.temporaryValues[sudokuState.selected[i]]!
						)

						sudokuState_copy.temporaryValues[sudokuState.selected[i]] = undefined
					}
				}
			}
		}
	}

	setSudokuState(sudokuState_copy)
}
