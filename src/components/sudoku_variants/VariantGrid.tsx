import React, { useState, memo } from 'react'

// Component that, upon variant = true, generates an array of divs
// overlaying the sudoku grid. This will allow user to see the
// variant restriction (i.e. thermo sudoku elements, killer grids)

// Also returns an array of arrays, showing the cells that share
// a variant restriction (i.e. appear on the same thermo). This
// could be used to generate errors based on the restrictive nature
// of the variant, rather than using the "one true solution" to check
// cell values. Then users can be given the option to use either
// type of error detection.

// Create new attribute for cell, variantdisplay: "thermo-horizontal"
// -> a thermo line going horizontal. or "thermo bulb down"-> the bulb
// of the thermo and the direction going down
// Create new object, settings, and have isVariant be a boolean value.
// Add other settings here too

import ThermoSudoku from './ThermoSudoku'
import ArrowSudoku from './ArrowSudoku'
import PalindromeSudoku from './PalindromeSudoku'

const Variant = ({
	cell,
	isThermo,
	isArrow,
	isPalindrome,
}: {
	cell: any
	isThermo: boolean
	isArrow: boolean
	isPalindrome: boolean
}) => {
	if (isThermo) {
		console.log('thermo: ' + isThermo)
		return (
			<ThermoSudoku
				isBulb={cell.thermoSudoku.isBulb}
				isTip={cell.thermoSudoku.isTip}
				directionOne={cell.thermoSudoku.directionOne}
				directionTwo={cell.thermoSudoku.directionTwo}
				column={cell.column}
				row={cell.row}
			/>
		)
	}

	if (isArrow) {
		console.log('arrow: ' + isArrow)
		return (
			<ArrowSudoku
				isArrow={cell.arrowSudoku.isArrow}
				isCircle={cell.arrowSudoku.isCircle}
				directionOne={cell.arrowSudoku.directionOne}
				directionTwo={cell.arrowSudoku.directionTwo}
			/>
		)
	}

	if (isPalindrome) {
		console.log('palindrome: ' + isPalindrome)
		return (
			<PalindromeSudoku
				isEnd={cell.palindromeSudoku.isEnd}
				directionOne={cell.palindromeSudoku.directionOne}
				directionTwo={cell.palindromeSudoku.directionTwo}
			/>
		)
	}
	var elem: JSX.Element = <g className="variant"></g>

	return elem
}

// Stop unnecessary re-rendering
function arePropsEqual(prevProps: { cell: any }, nextProps: { cell: any }) {
	return prevProps.cell === nextProps.cell
}

export default memo(Variant, arePropsEqual)
