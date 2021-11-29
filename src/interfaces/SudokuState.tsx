export default interface SudokuState {
	selected: number[]
	values: (number | undefined)[]
	temporaryValues: (number | undefined)[]
	pencilmarks: (number[] | undefined)[]
	leftClickDown: boolean
	rightClickDown: number[]
}
