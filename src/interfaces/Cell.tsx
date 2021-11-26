interface Cell {
    value?: number
        isPreFilled: boolean
        isSelected: boolean
        isRelated: boolean
        row: number
        column: number
        index: number
        error: boolean
        block: number
        pencil: number[]
        isRightClick: boolean
        temporaryValue?:number
        thermoSudoku: {
            isBulb:boolean
            isTip:boolean 
            directionOne:number
            directionTwo:number
        }
        arrowSudoku: {
            isCircle:boolean
            isArrow:boolean
            directionOne:number
            directionTwo:number
        }
        palindromeSudoku: {
            isEnd:boolean
            directionOne:number
            directionTwo:number
        }
}

export default Cell;