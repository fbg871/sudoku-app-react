import SudokuState from '../interfaces/SudokuState'

const newIncrementTemporary = (
	event: React.WheelEvent<SVGRectElement>,
	sudokuState: SudokuState,
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
) => {
	let sudokuState_copy: SudokuState = Object.assign({}, sudokuState)

	if (sudokuState.rightClickDown.length === 1) {
		if (event.nativeEvent.deltaY < 0) {
			if (
				sudokuState.temporaryValues[sudokuState.rightClickDown[0]] === undefined
			) {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]] = 1
			} else if (
				sudokuState.temporaryValues[sudokuState.rightClickDown[0]] === 9
			) {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]] =
					undefined
			} else {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]]!++
			}
		} else {
			if (
				sudokuState.temporaryValues[sudokuState.rightClickDown[0]] === undefined
			) {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]] = 9
			} else if (
				sudokuState.temporaryValues[sudokuState.rightClickDown[0]] === 1
			) {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]] =
					undefined
			} else {
				sudokuState_copy.temporaryValues[sudokuState.rightClickDown[0]]!--
			}
		}
		setSudokuState(sudokuState_copy)
	} else if (sudokuState.rightClickDown.length > 1) {
		for (let i = 0; i < sudokuState.rightClickDown.length; i++) {
			if (event.nativeEvent.deltaY < 0) {
				// let tmp_copy = temporaryValues.slice()
				if (
					sudokuState.temporaryValues[sudokuState.rightClickDown[i]] ===
					undefined
				) {
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]] = 1
				} else if (
					sudokuState.temporaryValues[sudokuState.rightClickDown[i]] === 9
				) {
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]] = 1
				} else {
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]]!++
				}
			} else {
				if (
					sudokuState.temporaryValues[sudokuState.rightClickDown[i]] ===
					undefined
				) {
					// let tmp_copy = temporaryValues.slice()
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]] = 9
				} else if (
					sudokuState.temporaryValues[sudokuState.rightClickDown[i]] === 1
				) {
					// let tmp_copy = temporaryValues.slice()
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]] = 9
				} else {
					// let tmp_copy = temporaryValues.slice()
					sudokuState_copy.temporaryValues[sudokuState.rightClickDown[i]]!--
				}
			}
		}
		setSudokuState(sudokuState_copy)
	}
}

export default newIncrementTemporary
