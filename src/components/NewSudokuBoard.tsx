import React, { useState, useEffect } from 'react'
import { IState } from './SudokuGame'
import PencilMarks from './PencilMarks'
import SudokuNumbers from './SudokuNumbers'
import MouseSelector from './MouseSelector'
import Variant from './VariantGrid'
import handleKeyboardInput from '../helpers/handleKeyboardInput'
import SudokuCell from './SudokuCell'
import Gamestate from '../interfaces/GameState'
import { sudoku_flat, sudoku_test } from '../helpers/sudoku_text'
import NewSudokuCell from './NewSudokuCell'
import SudokuState from '../interfaces/SudokuState'

const fillSudokuidState = () => {
	var sel: number[] = []
	var val: (number | undefined)[] = new Array(81).fill(undefined)
	var tmp: (number | undefined)[] = new Array(81).fill(undefined)
	var pencil: (number[] | undefined)[] = new Array(81).fill(undefined)
	var lft: boolean = false
	var rgt: number[] = []

	for (let i = 0; i < sudoku_flat.length; i++) {
		if (sudoku_flat[i] !== undefined) {
			val[i] = sudoku_flat[i]
		}
	}

	var state_arr: SudokuState = {
		selected: sel,
		values: val,
		temporaryValues: tmp,
		pencilmarks: pencil,
		leftClickDown: lft,
		rightClickDown: rgt,
	}

	return state_arr
}

const NewSudokuBoard = ({ settings }: { settings: IState['settings'] }) => {
	var lst: number[] = []

	var pencils: (number[] | undefined)[] = new Array(81).fill(undefined)

	var tempval: (number | undefined)[] = new Array(81).fill(undefined)

	var lst2: boolean[] = new Array(81).fill(false)

	// List of indices of selected cells
	// const [selected, setSelected] = useState(lst)

	// const [values, setValues] = useState(sudoku_flat)
	// const [temporaryValues, setTemporaryValues] = useState(tempval)

	// const [pencilmarks, setPencilmarks] = useState(pencils)

	// const [leftClickDown, setLeftClickDown] = useState(false)
	// const [rightClickDown, setRightClickDown] = useState(lst)

	const [sudokuState, setSudokuState] = useState(fillSudokuidState)

	var elem: JSX.Element[] = []

	for (let i = 0; i < 81; i++) {
		elem.push(
			<NewSudokuCell
				sudokuState={sudokuState}
				setSudokuState={setSudokuState}
				index={i}
			/>
		)
	}

	console.log(sudokuState.pencilmarks)

	return (
		<g
			className="cells"
			// onKeyDown={(e) =>
			// 	newHandleKeyboardInput(
			// 		settings,
			// 		e,
			// 		selected,
			// 		setSelected,
			// 		cells,
			// 		setCells
			// 	)
			// }
			tabIndex={0}
			// onMouseLeave={() => mouseReleased(100, undefined)}
		>
			{elem}
		</g>
	)
}

export default NewSudokuBoard
