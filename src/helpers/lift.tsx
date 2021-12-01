import SudokuState from '../interfaces/SudokuState'

const liftUpKey = (
	event: React.KeyboardEvent<SVGGElement>,
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
) => {
	if (event.key === 'Shift') {
		let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)
		if (sudokuState.shiftDown) {
			sudokuState_copy.shiftDown = false
			setSudokuState(sudokuState_copy)
		}
	}
}

export default liftUpKey
