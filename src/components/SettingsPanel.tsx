import { ReactChild, ReactFragment, ReactPortal } from 'react';
import Settings from '../interfaces/Settings'
import { IState } from './SudokuGame';

const SettingsPanel = ({settings, setSettings}: {settings:Settings, setSettings:React.Dispatch<React.SetStateAction<Settings>>}) => {


    const toggle = () => {
        if(settings.errorCheckType){
            settings.errorCheckType = false
        }else{
            settings.errorCheckType = true
        }
        setSettings(settings)
        console.log(settings)
    }
    
    return(
        <div className="settings">
            <input type="checkbox"
                id="error-check-type"
                checked = {settings.errorCheckType}
                onChange = {() => toggle()}
                ></input>
            <input type="checkbox"
                id="highlight-related"
                // checked = {settings.highlightRelated}
            ></input>
        </div>

    )

}

export default SettingsPanel;