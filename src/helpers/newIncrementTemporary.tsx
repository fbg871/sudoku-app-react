import { SetStateAction } from 'react'

const newIncrementTemporary = (
	event: React.WheelEvent<SVGRectElement>,
	rightClickDown: number[],
	temporaryValues: (number | undefined)[],
	setTemporaryValues: React.Dispatch<SetStateAction<(number | undefined)[]>>
) => {
	if (rightClickDown.length === 1) {
		if (event.nativeEvent.deltaY < 0) {
			let tmp_copy = temporaryValues.slice()
			if (tmp_copy[rightClickDown[0]] === undefined) {
				tmp_copy[rightClickDown[0]] = 1
				setTemporaryValues(tmp_copy)
			} else if (tmp_copy[rightClickDown[0]] === 9) {
				tmp_copy[rightClickDown[0]] = undefined
				setTemporaryValues(tmp_copy)
			} else {
				tmp_copy[rightClickDown[0]]!++
				setTemporaryValues(tmp_copy)
			}
		} else {
			if (temporaryValues[rightClickDown[0]] === undefined) {
				let tmp_copy = temporaryValues.slice()
				tmp_copy[rightClickDown[0]] = 9
				setTemporaryValues(tmp_copy)
			} else if (temporaryValues[rightClickDown[0]] === 1) {
				let tmp_copy = temporaryValues.slice()
				tmp_copy[rightClickDown[0]] = undefined
				setTemporaryValues(tmp_copy)
			} else {
				let tmp_copy = temporaryValues.slice()
				tmp_copy[rightClickDown[0]]!--
				setTemporaryValues(tmp_copy)
			}
		}
	} else if (rightClickDown.length > 1) {
		let tmp_copy = temporaryValues.slice()
		for (let i = 0; i < rightClickDown.length; i++) {
			if (event.nativeEvent.deltaY < 0) {
				// let tmp_copy = temporaryValues.slice()
				if (tmp_copy[rightClickDown[i]] === undefined) {
					tmp_copy[rightClickDown[i]] = 1
				} else if (tmp_copy[rightClickDown[i]] === 9) {
					tmp_copy[rightClickDown[i]] = 1
				} else {
					tmp_copy[rightClickDown[i]]!++
				}
			} else {
				if (temporaryValues[rightClickDown[i]] === undefined) {
					// let tmp_copy = temporaryValues.slice()
					tmp_copy[rightClickDown[i]] = 9
				} else if (temporaryValues[rightClickDown[i]] === 1) {
					// let tmp_copy = temporaryValues.slice()
					tmp_copy[rightClickDown[i]] = 9
				} else {
					// let tmp_copy = temporaryValues.slice()
					tmp_copy[rightClickDown[i]]!--
				}
			}
		}
		setTemporaryValues(tmp_copy)
	}
	console.log(temporaryValues)
}

export default newIncrementTemporary
