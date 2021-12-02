import { useState } from 'react'
import { sudoku_flat } from '../helpers/sudoku_text'
import SudokuCell from './SudokuCell'
import SudokuState from '../interfaces/SudokuState'
import Settings from '../interfaces/Settings'
import SudokuStat from '../interfaces/SudokuStat'
import GridState from '../interfaces/GridState'
import PencilMarks from './PencilMarks'
import CellSelect from './CellSelect'

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
	}

	return state_arr
}

const fillGridState = () => {
	var sel: number[] = [3]
	var lft: boolean = false
	var rgt: number[] = []
	var rel: number[] = []
	var pref: boolean[] = new Array(81).fill(false)
	var err: boolean[] = new Array(81).fill(false)

	for (let i = 0; i < sudoku_flat.length; i++) {
		if (sudoku_flat[i] !== undefined) {
			pref[i] = true
		}
	}

	var state_arr: GridState = {
		selected: sel,
		leftClickDown: lft,
		rightClickDown: rgt,
		related: rel,
		preFilled: pref,
		error: err,
	}

	return state_arr
}

const fillSudStat = () => {
	var val: (number | undefined)[] = new Array(81).fill(undefined)
	var tmp: (number | undefined)[] = new Array(81).fill(undefined)
	var pencil: (number[] | undefined)[] = new Array(81).fill(undefined)

	for (let i = 0; i < sudoku_flat.length; i++) {
		if (sudoku_flat[i] !== undefined) {
			val[i] = sudoku_flat[i]
		}
	}

	var stat: SudokuStat = {
		values: val,
		temporaryValues: tmp,
		pencilmarks: pencil,
	}

	return stat
}

const SudokuBoard = ({ settings }: { settings: Settings }) => {
	const [sudokuState, setSudokuState] = useState(fillSudokuidState)

	const [sudokuStat, setSudokuStat] = useState(fillSudStat)

	const [gridState, setGridState] = useState(fillGridState)

	let his: SudokuState[] = []
	const [history, setHistory] = useState(his)

	var elem: JSX.Element[] = []

	for (let i = 0; i < 81; i++) {
		elem.push(
			<SudokuCell
				key={i}
				sudokuState={sudokuState}
				setSudokuState={setSudokuState}
				sudokuStat={sudokuStat}
				setSudokuStat={setSudokuStat}
				gridState={gridState}
				setGridState={setGridState}
				index={i}
				history={history}
				setHistory={setHistory}
			/>
		)
	}

	console.log(history)
	return (
		<g
			className="cells"
			tabIndex={0}
			// onMouseLeave={() => mouseReleased(100, undefined)}
		>
			<CellSelect gridState={gridState} setGridState={setGridState} />

			{elem}
		</g>
	)
}

export default SudokuBoard
