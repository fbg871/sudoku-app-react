import { motion, MotionConfigContext } from 'framer-motion'
import React from 'react'
import { handleMouseMove, handleMouseRelease } from '../helpers/handleMouseEvents'
import incrementTemporary from '../helpers/incrementTemporary'
import SudokuState from '../interfaces/SudokuState'
import PencilMarks from './PencilMarks'
import TemporaryPencilmarks from './TemporaryPencilmarks'
import { handleMouseClick } from '../helpers/handleMouseEvents'
import newHandleKeyboardEvents from '../helpers/handleKeyboardEvents'
import SudokuStat from '../interfaces/SudokuStat'
import GridState from '../interfaces/GridState'

const SudokuCell = ({
	sudokuState,
	setSudokuState,
	sudokuStat,
	setSudokuStat,
	gridState,
	setGridState,
	index,
	history,
	setHistory,
}: {
	sudokuState: SudokuState
	setSudokuState: React.Dispatch<React.SetStateAction<SudokuState>>
	sudokuStat: SudokuStat
	setSudokuStat: React.Dispatch<React.SetStateAction<SudokuStat>>
	gridState: GridState
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
	index: number
	history: SudokuState[]
	setHistory: React.Dispatch<React.SetStateAction<SudokuState[]>>
}) => {
	return (
		<g className="cell-group" key={index}>
			<rect
				className="sudoku-cell"
				// key={cell.index}
				data-isprefilled={sudokuState.preFilled[index]}
				// data-isselected={sudokuState.selected.includes(index)}
				data-isrelated={sudokuState.related.includes(index)}
				data-isrightclick={sudokuState.rightClickDown.includes(index)}
				data-error={sudokuState.error[index]}
				data-index={index}
				y={Math.floor(index / 9) * 50}
				x={(index % 9) * 50}
				width="50"
				height="50"
				onMouseDown={(e) =>
					handleMouseClick(
						sudokuState,
						setSudokuState,
						e,
						index,
						gridState,
						setGridState
					)
				}
				onMouseMove={(e) =>
					handleMouseMove(
						sudokuState,
						setSudokuState,
						e,
						index,
						gridState,
						setGridState
					)
				}
				onMouseUp={(e) =>
					handleMouseRelease(
						sudokuState,
						setSudokuState,
						e,
						index,
						gridState,
						setGridState
					)
				}
				onWheel={(e) => incrementTemporary(e, sudokuState, setSudokuState)}
				onContextMenu={(e) => e.preventDefault()}
				onKeyDown={(e) =>
					newHandleKeyboardEvents(
						sudokuState,
						setSudokuState,
						e,
						gridState,
						setGridState
					)
				}
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
