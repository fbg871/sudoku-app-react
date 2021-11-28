import { IState } from "../components/SudokuGame"
import produce from "immer"

const incrementTemporary = (
	cellsp: IState["cells"],
	setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>,
	event: React.WheelEvent<SVGRectElement>
) => {
	const cells = cellsp

	const tst = produce((cellsp, draft) => draft)

	console.log(tst)

	cells.map((cell) => {
		if (cell.isRightClick) {
			if (cell.temporaryValue === undefined) {
				cell.temporaryValue = 1
			} else if (event.nativeEvent.deltaY < 0) {
				if (cell.temporaryValue === 9) {
					cell.temporaryValue = 1
				} else {
					cell.temporaryValue = cell.temporaryValue + 1
				}
			} else {
				if (cell.temporaryValue === 1) {
					cell.temporaryValue = 9
				} else {
					cell.temporaryValue = cell.temporaryValue - 1
				}
			}
		}
	})
	setCells([...cells])
}

export default incrementTemporary
