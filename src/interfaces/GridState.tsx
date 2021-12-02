export default interface GridState {
	selected: number[]
	leftClickDown: boolean
	rightClickDown: number[]
	related: number[]
	preFilled: boolean[]
	error: boolean[]
}
