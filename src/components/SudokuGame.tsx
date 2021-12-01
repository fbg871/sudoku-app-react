import Grid from './Grid'

import Settings from '../interfaces/Settings'

import SudokuBoard from './SudokuBoard'

const SudokuGame = ({ settings }: { settings: Settings }) => {
	return (
		<svg
			className="sudoku-game"
			width="500"
			height="500"
			viewBox="-50 -50 550 550"
		>
			{/* <SudokuBoard controls={controls} setControls={setControls} cells={cells} setCells={setCells} settings={settings}/> */}
			<SudokuBoard settings={settings} />
			<Grid />
		</svg>
	)
}

export default SudokuGame
