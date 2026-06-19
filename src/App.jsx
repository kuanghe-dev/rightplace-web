import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import GameBoard from './components/GameBoard.jsx'

export default function App() {
  const [config, setConfig] = useState(null) // { cardCount, cardType }

  if (config === null) {
    return <WelcomeScreen onStart={setConfig} />
  }
  return <GameBoard {...config} onMenu={() => setConfig(null)} />
}
