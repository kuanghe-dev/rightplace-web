import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import GameBoard from './components/GameBoard.jsx'

export default function App() {
  const [cardCount, setCardCount] = useState(null)

  if (cardCount === null) {
    return <WelcomeScreen onStart={setCardCount} />
  }
  return <GameBoard cardCount={cardCount} onMenu={() => setCardCount(null)} />
}
