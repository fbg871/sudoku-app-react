import { useState } from 'react'
import SudokuGame from './SudokuGame'
import SettingsPanel from './SettingsPanel'
import Settings from '../interfaces/Settings'

const GameSection = () => {
	var set: Settings = {
		isThermo: true,
		isArrow: false,
		isPalindrome: false,
		errorCheckType: true,
		highlightRelated: false,
		pencilmarkType: true,
	}

	const [settings, setSettings] = useState(set)

	return (
		<div className="game-section">
			<SudokuGame settings={settings} />
			<SettingsPanel settingsp={settings} setSettings={setSettings} />
		</div>
	)
}

export default GameSection
