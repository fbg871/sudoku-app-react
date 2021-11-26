import { IState } from "../components/SudokuGame";

const highlighter = (
    cells:IState["cells"],
    setCells: React.Dispatch<React.SetStateAction<IState["cells"]>>,
    selected: IState["selected"]) => {

        var num:number | undefined = undefined

        if(selected.length === 1){
            cells.map((cell) => {
                if(cell.index === selected[0]){
                    num = cell.value
                }
                if(selected.includes(cell.index)){
                    cell.isSelected = true
                }else{
                    cell.isSelected = false
                }
            })
        }else if(selected.length > 1){
            cells.map((cell) => {
                if(selected.includes(cell.index) && !cell.isPreFilled) {
                    cell.isSelected = true
                }else{
                    cell.isSelected = false
                }
            })
        }else{
            cells.map((cell) => {
                cell.isSelected = false
                cell.isRelated = false
            })
        }

        if(num !== undefined){
            cells.map((cell) =>{
                if(!selected.includes(cell.index) && cell.value === num){
                    cell.isRelated = true
                }else{
                    cell.isRelated = false
                }
            })
        }else{
            cells.map((cell)=>{
                cell.isRelated = false
            })
        }

        setCells([...cells])

}

export default highlighter;