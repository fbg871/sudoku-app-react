import { useState } from 'react'
import { sudoku_flat } from '../helpers/sudoku_text'
import SudokuCell from './SudokuCell'
import SudokuState from '../interfaces/SudokuState'
import Settings from '../interfaces/Settings'

const fillSudokuidState = () => {
	var sel: number[] = []
	var val: (number | undefined)[] = new Array(81).fill(undefined)
	var tmp: (number | undefined)[] = new Array(81).fill(undefined)
	var pencil: (number[] | undefined)[] = new Array(81).fill(undefined)
	var lft: boolean = false
	var rgt: number[] = []
	var rel: number[] = []
	var pref: boolean[] = new Array(81).fill(false)
	var err: boolean[] = new Array(81).fill(false)

	for (let i = 0; i < sudoku_flat.length; i++) {
		if (sudoku_flat[i] !== undefined) {
			val[i] = sudoku_flat[i]
			pref[i] = true
		}
	}

	var state_arr: SudokuState = {
		selected: sel,
		values: val,
		temporaryValues: tmp,
		pencilmarks: pencil,
		leftClickDown: lft,
		rightClickDown: rgt,
		related: rel,
		preFilled: pref,
		error: err,
		shiftDown: false,
	}

	return state_arr
}

const SudokuBoard = ({ settings }: { settings: Settings }) => {
	const [sudokuState, setSudokuState] = useState(fillSudokuidState)

	var elem: JSX.Element[] = []

	for (let i = 0; i < 81; i++) {
		elem.push(
			<SudokuCell
				key={i}
				sudokuState={sudokuState}
				setSudokuState={setSudokuState}
				index={i}
			/>
		)
	}

	return (
		<g
			className="cells"
			tabIndex={0}
			// onMouseLeave={() => mouseReleased(100, undefined)}
		>
			{elem}
		</g>
	)
}

export default SudokuBoard
