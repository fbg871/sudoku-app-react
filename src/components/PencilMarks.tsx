const PencilMarks = ({
	isprefilled,
	pencilmarks,
	index,
}: {
	isprefilled: boolean
	pencilmarks: (number[] | undefined)[]
	index: number
}) => {
	var ypos: number = Math.floor(index / 9) * 50
	var xpos: number = (index % 9) * 50

	var initialValue = true

	var textelements: JSX.Element[] = []
	if (!isprefilled) {
		if (pencilmarks[index] !== undefined && pencilmarks[index]) {
			pencilmarks[index]!.forEach((value) => {
				if (value === 1 || value === 4 || value === 7) {
					xpos = xpos + 7
				} else if (value === 2 || value === 5 || value === 8) {
					xpos = xpos + 22
				} else {
					xpos = xpos + 37
				}

				if (value === 1 || value === 2 || value === 3) {
					ypos = ypos + 15
				} else if (value === 4 || value === 5 || value === 6) {
					ypos = ypos + 29
				} else {
					ypos = ypos + 43
				}
				if (initialValue) {
					textelements = [
						<text
							key={value}
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
							key={value}
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
				ypos = Math.floor(index / 9) * 50
				xpos = (index % 9) * 50
			})
		}
	}
	return <g key={index}>{textelements}</g>
}

export default PencilMarks
