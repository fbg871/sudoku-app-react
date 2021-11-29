import { motion } from 'framer-motion'

const TemporaryPencilmarks = ({
	index,
	isprefilled,
	temporaryValues,
}: {
	index: number
	isprefilled: boolean
	temporaryValues: number | undefined
}) => {
	var xpos: number = Math.floor(index / 9) * 50
	var ypos: number = (index % 9) * 50

	var initialValue = true

	var textelements: JSX.Element[] = []

	if (!isprefilled && temporaryValues != undefined) {
		if (temporaryValues == 1 || temporaryValues == 4 || temporaryValues == 7) {
			xpos = xpos + 7
		} else if (
			temporaryValues == 2 ||
			temporaryValues == 5 ||
			temporaryValues == 8
		) {
			xpos = xpos + 22
		} else {
			xpos = xpos + 37
		}

		if (temporaryValues == 1 || temporaryValues == 2 || temporaryValues == 3) {
			ypos = ypos + 15
		} else if (
			temporaryValues == 4 ||
			temporaryValues == 5 ||
			temporaryValues == 6
		) {
			ypos = ypos + 29
		} else {
			ypos = ypos + 43
		}
	}

	return (
		<motion.text
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.6 }}
			exit={{ opacity: 0 }}
			className="sudoku-pencilmarks"
			x={xpos}
			y={ypos}
			width="15"
			height="15"
		>
			{temporaryValues}
		</motion.text>
	)
}

export default TemporaryPencilmarks
