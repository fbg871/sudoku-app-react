import { ReactChild, ReactFragment, ReactPortal } from 'react';
import Settings from '../interfaces/Settings'

const SettingsPanel = ({ settingsp, setSettings }: { settingsp: Settings, setSettings: React.Dispatch<React.SetStateAction<Settings>> }) => {


    const toggle = (set: string) => {

        const settings = settingsp

        if (set === "error") {
            if (settings.errorCheckType) {
                settings.errorCheckType = false
            } else {
                settings.errorCheckType = true
            }
        } else if (set === "related") {
            if (settings.highlightRelated) {
                settings.highlightRelated = false
            } else {
                settings.highlightRelated = true
            }
            // setSettings(settings)
            setSettings(settings)
        }

        console.log("settings panel")
        console.log(settingsp)
    }

    return (
        <div className="settings">

            <table width="100%">
                <tbody>
                    <tr>
                        <td>Error check type</td>
                        <td>
                            <input type="checkbox"
                                id="error-check-type"
                                defaultChecked={settingsp.errorCheckType}
                                onChange={() => toggle("error")} />
                        </td>
                    </tr>
                    <tr>
                        <td>Highlight related cells</td>
                        <td><input type="checkbox"
                            id="highlight-related"
                            defaultChecked={settingsp.highlightRelated}
                            onChange={() => toggle("related")} />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

    )

}

export default SettingsPanel;