import { motion } from 'framer-motion'
import React, { useState } from 'react'
import newHandleMouseEvents from '../helpers/newHandleMouseEvents'
import newIncrementTemporary from '../helpers/newIncrementTemporary'
import { sudoku_flat } from '../helpers/sudoku_text'
import Cell from '../interfaces/Cell'
import Settings from '../interfaces/Settings'
import SudokuState from '../interfaces/SudokuState'
import NewPencilMarks from './NewPencilMarks'
import TemporaryPencilmarks from './TemporaryPencilmarks'

const NewSudokuCell = ({
	sudokuState,
	setSudokuState,
	index,
}: {
	sudokuState: SudokuState
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
	index: number
}) => {
	// Pass index, value to this component. don't make state

	// maybe best to create helper function to extract col, row
	// info from just the index

	var pref: boolean = false

	if (sudokuState.values[index] !== undefined) {
		pref = true
	}

	const [isPreFilled, setPreFilled] = useState(pref)
	const [isRelated, setRelated] = useState(false)
	const [error, setError] = useState(false)

	return (
		<g className="cell-group">
			<rect
				className="sudoku-cell"
				// key={cell.index}
				data-isprefilled={isPreFilled}
				data-isselected={sudokuState.selected.includes(index)}
				data-isrelated={isRelated}
				data-isrightclick={sudokuState.rightClickDown.includes(index)}
				data-error={error}
				data-index={index}
				x={Math.floor(index / 9) * 50}
				y={(index % 9) * 50}
				width="50"
				height="50"
				onMouseDown={(e) =>
					newHandleMouseEvents(
						sudokuState,
						setSudokuState,
						error,
						setError,
						isPreFilled,
						'click',
						e,
						index
					)
				}
				onMouseMove={(e) =>
					newHandleMouseEvents(
						sudokuState,
						setSudokuState,
						error,
						setError,
						isPreFilled,
						'move',
						e,
						index
					)
				}
				onMouseUp={(e) =>
					newHandleMouseEvents(
						sudokuState,
						setSudokuState,
						error,
						setError,
						isPreFilled,
						'release',
						e,
						index
					)
				}
				onWheel={(e) => newIncrementTemporary(e, sudokuState, setSudokuState)}
				onContextMenu={(e) => e.preventDefault()}
			/>
			<text
				className="sudoku-numbers"
				x={Math.floor(index / 9) * 50 + 25}
				y={(index % 9) * 50 + 25}
				width="50"
				height="50"
			>
				{sudokuState.values[index]}
			</text>
			{sudokuState.rightClickDown.includes(index) &&
				sudokuState.selected.length === 1 && (
					<motion.text
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.4 }}
						exit={{ opacity: 0 }}
						className="mouse-selector"
						x={Math.floor(index / 9) * 50 + 25}
						y={(index % 9) * 50 + 25}
						width="50"
						height="50"
					>
						{sudokuState.temporaryValues[index]}
					</motion.text>
				)}
			{sudokuState.rightClickDown.includes(index) &&
				sudokuState.selected.length > 1 && (
					<TemporaryPencilmarks
						index={index}
						isprefilled={isPreFilled}
						temporaryValues={sudokuState.temporaryValues[index]}
					/>

					// <NewPencilMarks  isprefilled = {isPreFilled} column={index % 9} row={index % 9} pencilmarks={pencilmarks} setPencilmarks={setPencilmarks} index={index}/>
				)}
			<NewPencilMarks
				isprefilled={isPreFilled}
				pencilmarks={sudokuState.pencilmarks}
				index={index}
			/>
		</g>
	)
}

export default NewSudokuCell
