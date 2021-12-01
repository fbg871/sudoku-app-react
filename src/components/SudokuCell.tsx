import { motion, MotionConfigContext } from 'framer-motion'
import React from 'react'
import liftUpKey from '../helpers/lift'
import { handleMouseMove, handleMouseRelease } from '../helpers/handleMouseEvents'
import newIncrementTemporary from '../helpers/incrementTemporary'
import SudokuState from '../interfaces/SudokuState'
import PencilMarks from './PencilMarks'
import TemporaryPencilmarks from './TemporaryPencilmarks'
import { handleMouseClick } from '../helpers/handleMouseEvents'
import newHandleKeyboardEvents from '../helpers/handleKeyboardEvents'

const SudokuCell = ({
	sudokuState,
	setSudokuState,
	index,
}: {
	sudokuState: SudokuState
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
	index: number
}) => {
	return (
		<g className="cell-group" key={index}>
			<rect
				className="sudoku-cell"
				// key={cell.index}
				data-isprefilled={sudokuState.preFilled[index]}
				data-isselected={sudokuState.selected.includes(index)}
				data-isrelated={sudokuState.related.includes(index)}
				data-isrightclick={sudokuState.rightClickDown.includes(index)}
				data-error={sudokuState.error[index]}
				data-index={index}
				y={Math.floor(index / 9) * 50}
				x={(index % 9) * 50}
				width="50"
				height="50"
				onMouseDown={(e) => handleMouseClick(sudokuState, setSudokuState, e, index)}
				onMouseMove={(e) => handleMouseMove(sudokuState, setSudokuState, e, index)}
				onMouseUp={(e) => handleMouseRelease(sudokuState, setSudokuState, e, index)}
				onWheel={(e) => newIncrementTemporary(e, sudokuState, setSudokuState)}
				onContextMenu={(e) => e.preventDefault()}
				onKeyDown={(e) => newHandleKeyboardEvents(sudokuState, setSudokuState, e)}
				onKeyUp={(e) => liftUpKey(e, sudokuState, setSudokuState)}
				tabIndex={0}
			/>
			<text
				className="sudoku-numbers"
				y={Math.floor(index / 9) * 50 + 25}
				x={(index % 9) * 50 + 25}
				width="50"
				height="50"
			>
				{sudokuState.values[index]}
			</text>
			{sudokuState.rightClickDown.includes(index) &&
				sudokuState.selected.length === 1 && (
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
							className="mouse-selector"
							y={Math.floor(index / 9) * 50 + 25}
							x={(index % 9) * 50 + 25}
							width="50"
							height="50"
						>
							{sudokuState.temporaryValues[index]}
						</motion.text>
					</g>
				)}
			{sudokuState.rightClickDown.includes(index) &&
				sudokuState.selected.length > 1 && (
					<TemporaryPencilmarks
						index={index}
						isprefilled={sudokuState.preFilled[index]}
						temporary={sudokuState.temporaryValues[index]}
						pencilmarks={sudokuState.pencilmarks[index]}
					/>

					// <NewPencilMarks  isprefilled = {isPreFilled} column={index % 9} row={index % 9} pencilmarks={pencilmarks} setPencilmarks={setPencilmarks} index={index}/>
				)}
			<PencilMarks
				isprefilled={sudokuState.preFilled[index]}
				pencilmarks={sudokuState.pencilmarks}
				index={index}
			/>
		</g>
	)
}

export default SudokuCell
