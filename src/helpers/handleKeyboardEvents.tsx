import React from 'react'
import SudokuState from '../interfaces/SudokuState'
import { validCodes, validInputs } from '../interfaces/validInputs'
import errorCheck from './errorCheck'
import { convertCodetoNumber } from './convertCodetoNumber'
import GridState from '../interfaces/GridState'

const navigateWithArrows = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.KeyboardEvent<SVGGElement>,
	gridState: GridState,
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
) => {
	let sudokuState_copy = Object.assign({}, sudokuState)
	let gridState_copy: GridState = Object.assign({}, gridState)

	event.preventDefault()

	if (event.shiftKey) {
		let endIndex = sudokuState.selected.length - 1

		if (event.key === 'ArrowUp' && sudokuState.selected[endIndex] > 8) {
			sudokuState_copy.selected.push(sudokuState.selected[endIndex] - 9)
			if (!gridState.selected.includes(gridState.selected[endIndex] - 9)) {
				gridState_copy.selected.push(gridState.selected[endIndex] - 9)
			}
		} else if (
			event.key === 'ArrowRight' &&
			sudokuState.selected[endIndex] % 9 !== 8
		) {
			sudokuState_copy.selected.push(sudokuState.selected[endIndex] + 1)
			if (!gridState.selected.includes(gridState.selected[endIndex] + 1)) {
				gridState_copy.selected.push(gridState.selected[endIndex] + 1)
			}
		} else if (
			event.key === 'ArrowLeft' &&
			sudokuState.selected[endIndex] % 9 !== 0
		) {
			sudokuState_copy.selected.push(sudokuState.selected[endIndex] - 1)
			if (!gridState.selected.includes(gridState.selected[endIndex] - 1)) {
				gridState_copy.selected.push(gridState.selected[endIndex] - 1)
			}
		} else if (event.key === 'ArrowDown' && sudokuState.selected[endIndex] < 72) {
			sudokuState_copy.selected.push(sudokuState.selected[endIndex] + 9)
			if (!gridState.selected.includes(gridState.selected[endIndex] + 9)) {
				gridState_copy.selected.push(gridState.selected[endIndex] + 9)
			}
		}
		setSudokuState(sudokuState_copy)
		setGridState(gridState_copy)
	} else {
		let endIndex = sudokuState.selected.length - 1

		if (sudokuState.selected.length === 1) {
			if (event.key === 'ArrowUp' && sudokuState.selected[0] > 8) {
				sudokuState_copy.selected = [sudokuState.selected[0] - 9]
			} else if (event.key === 'ArrowRight' && sudokuState.selected[0] % 9 !== 8) {
				sudokuState_copy.selected = [sudokuState.selected[0] + 1]
			} else if (event.key === 'ArrowLeft' && sudokuState.selected[0] % 9 !== 0) {
				sudokuState_copy.selected = [sudokuState.selected[0] - 1]
			} else if (event.key === 'ArrowDown' && sudokuState.selected[0] < 72) {
				sudokuState_copy.selected = [sudokuState.selected[0] + 9]
			}
			setSudokuState(sudokuState_copy)
		} else if (sudokuState.selected.length > 1) {
			if (event.key === 'ArrowUp' && sudokuState.selected[endIndex] > 8) {
				sudokuState_copy.selected = [sudokuState.selected[endIndex] - 9]
			} else if (event.key === 'ArrowRight' && sudokuState.selected[0] % 9 !== 8) {
				sudokuState_copy.selected = [sudokuState.selected[endIndex] + 1]
			} else if (event.key === 'ArrowLeft' && sudokuState.selected[0] % 9 !== 0) {
				sudokuState_copy.selected = [sudokuState.selected[endIndex] - 1]
			} else if (event.key === 'ArrowDown' && sudokuState.selected[0] < 72) {
				sudokuState_copy.selected = [sudokuState.selected[endIndex] + 9]
			}
			setSudokuState(sudokuState_copy)
		}
	}

	if (sudokuState.selected.length === 1) {
		if (event.key === 'ArrowUp' && sudokuState.selected[0] > 8) {
			sudokuState_copy.selected = [sudokuState.selected[0] - 9]
		} else if (event.key === 'ArrowRight' && sudokuState.selected[0] % 9 !== 8) {
			sudokuState_copy.selected = [sudokuState.selected[0] + 1]
		} else if (event.key === 'ArrowLeft' && sudokuState.selected[0] % 9 !== 0) {
			sudokuState_copy.selected = [sudokuState.selected[0] - 1]
		} else if (event.key === 'ArrowDown' && sudokuState.selected[0] < 72) {
			sudokuState_copy.selected = [sudokuState.selected[0] + 9]
		}
		setSudokuState(sudokuState_copy)
	}
}

const setValue = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.KeyboardEvent<SVGGElement>,
	gridState: GridState,
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
) => {
	let sudokuState_copy = Object.assign({}, sudokuState)
	sudokuState_copy.values[sudokuState.selected[0]] = parseInt(event.key)

	if (errorCheck(sudokuState.selected[0]!, parseInt(event.key))) {
		sudokuState_copy.error[sudokuState.selected[0]] = true
	} else {
		sudokuState_copy.error[sudokuState.selected[0]] = false
	}

	setSudokuState(sudokuState_copy)
}

const setPencil = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.KeyboardEvent<SVGGElement>,
	gridState: GridState,
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
) => {
	let sudokuState_copy = Object.assign({}, sudokuState)

	sudokuState.selected.forEach((ind) => {
		if (sudokuState.values[ind] === undefined) {
			if (sudokuState_copy.pencilmarks[ind] === undefined) {
				if (event.shiftKey) {
					if (validCodes.includes(event.code)) {
						let num: number = convertCodetoNumber(event.code)!

						let penc = []
						penc.push(num)
						sudokuState_copy.pencilmarks[ind] = penc
					}
				} else {
					let penc = []
					penc.push(parseInt(event.key))

					sudokuState_copy.pencilmarks[ind] = penc
				}
			} else if (event.shiftKey) {
				if (
					sudokuState.pencilmarks[ind]!.includes(convertCodetoNumber(event.code)!)
				) {
					let pencil_copy = sudokuState_copy.pencilmarks[ind]!.slice()
					let index_for_removal = pencil_copy.indexOf(
						convertCodetoNumber(event.code)!
					)
					if (index_for_removal > -1) {
						pencil_copy.splice(index_for_removal, 1)
					}
					sudokuState_copy.pencilmarks[ind]! = pencil_copy
				} else {
					sudokuState_copy.pencilmarks[ind]!.push(convertCodetoNumber(event.code)!)
				}
			} else {
				if (sudokuState.pencilmarks[ind]!.includes(parseInt(event.key))) {
					let pencil_copy = sudokuState_copy.pencilmarks[ind]!.slice()
					let index_for_removal = pencil_copy.indexOf(parseInt(event.key))
					if (index_for_removal > -1) {
						pencil_copy.splice(index_for_removal, 1)
					}
					sudokuState_copy.pencilmarks[ind]! = pencil_copy
				} else {
					sudokuState_copy.pencilmarks[ind]!.push(parseInt(event.key))
				}
			}
		}
	})
	setSudokuState(sudokuState_copy)
}

const deleteAll = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.KeyboardEvent<SVGGElement>,
	gridState: GridState,
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
) => {
	let sudokuState_copy = Object.assign({}, sudokuState)
	sudokuState.selected.forEach((cell_index) => {
		if (!sudokuState.preFilled[cell_index]) {
			sudokuState_copy.values[cell_index] = undefined
			sudokuState_copy.pencilmarks[cell_index] = undefined
			sudokuState_copy.error[cell_index] = false
		}
	})
	setSudokuState(sudokuState_copy)
}

const newHandleKeyboardEvents = (
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>,
	event: React.KeyboardEvent<SVGGElement>,
	gridState: GridState,
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
) => {
	if (validInputs.includes(parseInt(event.key)) || validCodes.includes(event.code)) {
		if (
			sudokuState.selected.length === 1 &&
			!sudokuState.preFilled[sudokuState.selected[0]] &&
			event.shiftKey
		) {
			setPencil(sudokuState, setSudokuState, event, gridState, setGridState)
		} else if (
			sudokuState.selected.length === 1 &&
			!sudokuState.preFilled[sudokuState.selected[0]]
		) {
			setValue(sudokuState, setSudokuState, event, gridState, setGridState)
		} else if (sudokuState.selected.length > 1) {
			setPencil(sudokuState, setSudokuState, event, gridState, setGridState)
		}
	} else if (event.key === 'Delete' || event.key === 'Backspace') {
		deleteAll(sudokuState, setSudokuState, event, gridState, setGridState)
	} else if (
		event.key === 'ArrowUp' ||
		event.key === 'ArrowDown' ||
		event.key === 'ArrowRight' ||
		event.key === 'ArrowLeft'
	) {
		navigateWithArrows(sudokuState, setSudokuState, event, gridState, setGridState)
	}
}

const undoState = (
	history: SudokuState[],
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
) => {
	if (history.length > 1) {
		console.log('yup')
		setSudokuState(history[0])
	}
}

export default newHandleKeyboardEvents
