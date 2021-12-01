import { solved_flat } from './sudoku_text'

const newErrorCheck = (
	recentIndex: number,
	recentValue: number | undefined
) => {
	if (true) {
		if (recentValue === solved_flat[recentIndex]) {
			return false
		} else if (recentValue === undefined) {
			return false
		} else {
			return true
		}
	} else {
	}
}

export default newErrorCheck
