import Cell from '../interfaces/Cell'
import { IState } from '../components/SudokuGame'
import Settings from '../interfaces/Settings'

import { solved_flat } from './sudoku_text'

const newErrorCheck = (
	error: boolean,
	setError: React.Dispatch<React.SetStateAction<boolean>>,

	values: (number | undefined)[],
	selected: number[]
	// settings: Settings
) => {
	if (true) {
		if (selected.length === 1) {
			if (values[selected[0]] !== undefined) {
				if (values[selected[0]] !== solved_flat[selected[0]]) {
					setError(true)
				} else {
					setError(false)
				}
			}
		}
	} else {
	}
}

export default newErrorCheck
