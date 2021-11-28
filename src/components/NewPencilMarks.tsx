const NewPencilMarks = ({
	isprefilled,
	pencilmarks,
	setPencilmarks,
	index,
}: {
	isprefilled: boolean
	pencilmarks: (number[] | undefined)[]
	setPencilmarks: React.Dispatch<React.SetStateAction<(number[] | undefined)[]>>
	index: number
}) => {
	var xpos: number = Math.floor(index / 9) * 50
	var ypos: number = (index % 9) * 50

	var initialValue = true

	var textelements: JSX.Element[] = []
	if (!isprefilled) {
		if (pencilmarks[index] !== undefined) {
			pencilmarks[index]!.map((value) => {
				if (value == 1 || value == 4 || value == 7) {
					xpos = xpos + 7
				} else if (value == 2 || value == 5 || value == 8) {
					xpos = xpos + 22
				} else {
					xpos = xpos + 37
				}

				if (value == 1 || value == 2 || value == 3) {
					ypos = ypos + 15
				} else if (value == 4 || value == 5 || value == 6) {
					ypos = ypos + 29
				} else {
					ypos = ypos + 43
				}
				if (initialValue) {
					textelements = [
						<text
							className="sudoku-pencilmarks"
							x={xpos}
							y={ypos}
							width="15"
							height="15"
						>
							{value}
						</text>,
					]
					initialValue = false
				} else {
					textelements.push(
						<text
							className="sudoku-pencilmarks"
							x={xpos}
							y={ypos}
							width="15"
							height="15"
						>
							{value}
						</text>
					)
				}
				xpos = Math.floor(index / 9) * 50
				ypos = (index % 9) * 50
			})
		}
	}
	return <g key={index}>{textelements}</g>
}

export default NewPencilMarks
