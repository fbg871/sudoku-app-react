import { useState } from "react";
import SudokuGrid, { IState } from "./SudokuGame";
import SettingsPanel from "./SettingsPanel";
import Settings from "../interfaces/Settings";



const GameSection = () => {

    var set:Settings = {
        isThermo:true,
        isArrow:false,
        isPalindrome:false,
        errorCheckType:false,
        highlightRelated:false    
    }


    const [settings, setSettings] = useState(set)

    return(
        <div className = "game-section">
            <SudokuGrid />

            <SettingsPanel settings = {settings} setSettings={setSettings} />
        </div>
    )
}

export default GameSection;