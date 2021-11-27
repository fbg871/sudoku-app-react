import handleMouseEvents from "../helpers/handleMouseEvents";
import incrementTemporary from "../helpers/incrementTemporary";
import Cell from "../interfaces/Cell";
import Settings from "../interfaces/Settings";
import { IState } from "./SudokuGame";

const SudokuCell = ({settings, rectCell, selected, setSelected, cells, setCells, leftClickDown, setLeftClickDown}:
    {settings:Settings
    rectCell:Cell,
    selected:IState["selected"],
    setSelected:React.Dispatch<React.SetStateAction<IState["selected"]>>,
    cells:IState["cells"], 
    setCells:React.Dispatch<React.SetStateAction<IState["cells"]>>,
    leftClickDown:boolean,
    setLeftClickDown: React.Dispatch<React.SetStateAction<boolean>>
}
    ) => {
        return(
            <rect className="sudoku-cell"
                // key={cell.index}
                data-isprefilled={rectCell.isPreFilled}
                data-isselected={rectCell.isSelected}
                data-isrelated={rectCell.isRelated}
                data-isrightclick={rectCell.isRightClick}
                data-error={rectCell.error}
                data-index={rectCell.index}

                x={rectCell.column * 50}
                y={rectCell.row * 50}
                width="50"
                height="50"

                onMouseDown={(e) => handleMouseEvents(settings,"click", cells, setCells, leftClickDown, setLeftClickDown, selected, setSelected, e, rectCell.index)}
                onMouseMove={(e) => handleMouseEvents(settings,"move", cells, setCells, leftClickDown, setLeftClickDown, selected, setSelected, e, rectCell.index)}
                onMouseUp={(e) => handleMouseEvents(settings,"release", cells, setCells, leftClickDown, setLeftClickDown, selected, setSelected, e, rectCell.index)}

                onWheel={(e) => incrementTemporary(cells, setCells, e)}

                onContextMenu={(e) => e.preventDefault()}

            />
    )
}

export default SudokuCell;

