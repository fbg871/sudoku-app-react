import React from 'react'
import GridState from '../interfaces/GridState'

const CellSelect = ({
	gridState,
	setGridState,
}: {
	gridState: GridState
	setGridState: React.Dispatch<React.SetStateAction<GridState>>
}) => {
	let gridState_copy = Object.assign({}, gridState)

	let elem: JSX.Element[] = []

	gridState.selected.forEach((sel) => {
		console.log('yo')
		elem.push(
			<rect
				className="sudoku-cell-select"
				// key={cell.index}
				// data-isprefilled={sudokuState.preFilled[index]}
				// data-isselected={sudokuState.selected.includes(index)}
				// data-isrelated={sudokuState.related.includes(index)}
				// data-isrightclick={sudokuState.rightClickDown.includes(index)}
				// data-error={sudokuState.error[index]}
				data-index={sel}
				y={Math.floor(sel / 9) * 50}
				x={(sel % 9) * 50}
				width="50"
				height="50"
				tabIndex={0}
			/>
		)
	})

	return <g>{elem}</g>
}

export default CellSelect
