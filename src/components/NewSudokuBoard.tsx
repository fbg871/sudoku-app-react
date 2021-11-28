import React, { useState, useEffect } from "react";
import { IState } from "./SudokuGame";
import PencilMarks from "./PencilMarks";
import SudokuNumbers from "./SudokuNumbers";
import MouseSelector from "./MouseSelector";
import Variant from "./VariantGrid";
import handleKeyboardInput from "../helpers/handleKeyboardInput";
import SudokuCell from "./SudokuCell";
import Gamestate from "../interfaces/GameState";
import { sudoku_flat, sudoku_test } from "../helpers/sudoku_text";
import NewSudokuCell from "./NewSudokuCell";

const NewSudokuBoard = ({
	controls,
	setControls,
	cells,
	setCells,
	settings,
}: {
	cells: IState["cells"];
	setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>;

	controls: IState["controls"];
	setControls: React.Dispatch<React.SetStateAction<IState["controls"]>>;

	settings: IState["settings"];
}) => {
	var lst: number[] = [];

	var pencils: (number[] | undefined)[] = new Array(81).fill(undefined);

	console.log(pencils);
	var tempval: (number | undefined)[] = new Array(81).fill(undefined);

	var lst2: boolean[] = new Array(81).fill(false);

	// List of indices of selected cells
	const [selected, setSelected] = useState(lst);

	const [values, setValues] = useState(sudoku_flat);
	const [temporaryValues, setTemporaryValues] = useState(tempval);

	const [pencilmarks, setPencilmarks] = useState(pencils);

	const [leftClickDown, setLeftClickDown] = useState(false);
	const [rightClickDown, setRightClickDown] = useState(lst);

	const [filled, setFilled] = useState(lst2);

	var elem: JSX.Element[] = [];

	for (let i = 0; i < sudoku_test.length; i++) {
		for (let j = 0; j < sudoku_test[i].length; j++) {
			if (sudoku_test[i][j] != 0) {
				elem.push(
					<NewSudokuCell
						pencilmarks={pencilmarks}
						setPencilmarks={setPencilmarks}
						temporaryValues={temporaryValues}
						setTemporaryValues={setTemporaryValues}
						leftClickDown={leftClickDown}
						setLeftClickDown={setLeftClickDown}
						rightClickDown={rightClickDown}
						setRightClickDown={setRightClickDown}
						selected={selected}
						setSelected={setSelected}
						index={i * 9 + j}
						values={values}
						setValues={setValues}
						filled={filled}
						setFilled={setFilled}
					/>
				);
			} else {
				elem.push(
					<NewSudokuCell
						pencilmarks={pencilmarks}
						setPencilmarks={setPencilmarks}
						temporaryValues={temporaryValues}
						setTemporaryValues={setTemporaryValues}
						leftClickDown={leftClickDown}
						setLeftClickDown={setLeftClickDown}
						rightClickDown={rightClickDown}
						setRightClickDown={setRightClickDown}
						selected={selected}
						setSelected={setSelected}
						index={i * 9 + j}
						values={values}
						setValues={setValues}
						filled={filled}
						setFilled={setFilled}
					/>
				);
			}
		}
	}

	return (
		<g
			className="cells"
			onKeyDown={(e) =>
				handleKeyboardInput(
					filled,
					setFilled,
					settings,
					e,
					selected,
					setSelected,
					cells,
					setCells
				)
			}
			tabIndex={0}
			// onMouseLeave={() => mouseReleased(100, undefined)}
		>
			{elem}
		</g>
	);
};

export default NewSudokuBoard;
