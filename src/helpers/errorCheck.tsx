import Cell from '../interfaces/Cell'
import { IState } from '../components/SudokuGame'
import Settings from '../interfaces/Settings'

import { solved_test } from './sudoku_text'

const errorCheck = (
	settingsp: Settings,
	cellsp: IState['cells'],
	setCells: React.Dispatch<React.SetStateAction<IState['cells']>>,
	index: number,
	recentValue: number,
	recentColumn: number,
	recentRow: number,
	recentBlock: number
) => {
	const cells = cellsp

	var err = false

	if (settingsp.errorCheckType) {
		cells.map((cell: any) => {
			if (
				(cell.column == recentColumn ||
					cell.row == recentRow ||
					cell.block == recentBlock) &&
				cell.index != index
			) {
				if (recentValue == cell.value && recentValue != 0) {
					err = true
				}
			}
		})

		cells.map((cell: Cell) => {
			if (cell.index == index) {
				if (err) {
					cell.error = true
				} else {
					cell.error = false
				}
			}
		})
	} else {
		cells.map((cell: Cell) => {
			if (cell.index === index) {
				if (cell.value !== solved_test[recentRow][recentColumn]) {
					cell.error = true
				} else {
					cell.error = false
				}
			}
		})
	}
	setCells([...cells])
}

export default errorCheck
