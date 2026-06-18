import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function WinScreen({ swapCount, onPlayAgain }) {
  useEffect(() => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#2DD4BF', '#5EEAD4', '#F8FAFC', '#7C3AED', '#FCD34D'],
    })
  }, [])

  return (
    <div className="win-overlay" role="dialog" aria-modal="true" aria-label="You won!">
      <div className="win-box">
        <p className="win-box__emoji">🎉</p>
        <h2 className="win-box__title">All in the right place!</h2>
        <p className="win-box__score">
          Solved in <strong>{swapCount}</strong> swap{swapCount !== 1 ? 's' : ''}
        </p>
        <button className="btn-play-again" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}
