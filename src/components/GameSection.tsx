import { useState } from "react";
import SudokuGame, { IState } from "./SudokuGame";
import SettingsPanel from "./SettingsPanel";
import Settings from "../interfaces/Settings";

const GameSection = () => {

    var set:Settings = {
        isThermo:true,
        isArrow:false,
        isPalindrome:false,
        errorCheckType:true,
        highlightRelated:false    
    }

    const [settings, setSettings] = useState(set)

    return(
        <div className = "game-section">
            <SudokuGame settings={settings} setSettings = {setSettings} />

            <SettingsPanel settingsp = {settings} setSettings={setSettings} />
        </div>
    )
}

export default GameSection;