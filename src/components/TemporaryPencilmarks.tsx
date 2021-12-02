import { motion } from 'framer-motion'

const TemporaryPencilmarks = ({
	index,
	isprefilled,
	temporary,
	pencilmarks,
}: {
	index: number
	isprefilled: boolean
	temporary: number | undefined
	pencilmarks: number[] | undefined
}) => {
	var ypos: number = Math.floor(index / 9) * 50
	var xpos: number = (index % 9) * 50

	if (!isprefilled && temporary !== undefined) {
		if (temporary === 1 || temporary === 4 || temporary === 7) {
			xpos = xpos + 6
		} else if (temporary === 2 || temporary === 5 || temporary === 8) {
			xpos = xpos + 21
		} else {
			xpos = xpos + 36
		}

		if (temporary === 1 || temporary === 2 || temporary === 3) {
			ypos = ypos + 14
		} else if (temporary === 4 || temporary === 5 || temporary === 6) {
			ypos = ypos + 29
		} else {
			ypos = ypos + 44
		}
	}

	if (pencilmarks !== undefined && temporary !== undefined) {
		if (pencilmarks.includes(temporary)) {
			return (
				<g>
					<motion.rect
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.4 }}
						exit={{ opacity: 0 }}
						className="temp-test"
						y={Math.floor(index / 9) * 50}
						x={(index % 9) * 50}
						width="50"
						height="50"
					></motion.rect>
					<motion.text
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="cancel"
						x={xpos}
						y={ypos}
						width="15"
						height="15"
					>
						/
					</motion.text>
				</g>
			)
		}
	}

	return (
		<g>
			<motion.rect
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.4 }}
				exit={{ opacity: 0 }}
				className="temp-test"
				y={Math.floor(index / 9) * 50}
				x={(index % 9) * 50}
				width="50"
				height="50"
			></motion.rect>
			<motion.text
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.4 }}
				exit={{ opacity: 0 }}
				className="sudoku-pencilmarks"
				x={xpos}
				y={ypos}
				width="15"
				height="15"
			>
				{temporary}
			</motion.text>
		</g>
	)
}

export default TemporaryPencilmarks
