import { useState, useRef, useCallback } from 'react'
import { createShuffled, score, swap } from '../game.js'
import Card from './Card.jsx'
import WinScreen from './WinScreen.jsx'

export default function GameBoard({ cardCount, onMenu }) {
  const [letters, setLetters] = useState(() => createShuffled(cardCount))
  const [selected, setSelected] = useState([])
  const [swapCount, setSwapCount] = useState(0)
  const [animPair, setAnimPair] = useState(null) // { a, b, dxA, dxB }
  const cardRefs = useRef([])

  const correct = score(letters)
  const won = correct === cardCount
  const swapping = animPair !== null

  const handleCardClick = useCallback((index) => {
    if (swapping) return
    setSelected(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      if (prev.length === 2) return prev
      return [...prev, index]
    })
  }, [swapping])

  const handleSwap = useCallback(() => {
    if (selected.length !== 2 || swapping) return
    const [a, b] = selected

    const rectA = cardRefs.current[a].getBoundingClientRect()
    const rectB = cardRefs.current[b].getBoundingClientRect()
    const dx = rectB.left - rectA.left

    setSelected([])
    setAnimPair({ a, b, dxA: dx, dxB: -dx })

    setTimeout(() => {
      setLetters(prev => swap(prev, a, b))
      setSwapCount(c => c + 1)
      setAnimPair(null)
    }, 300)
  }, [selected, swapping])

  const handlePlayAgain = useCallback(() => {
    setLetters(createShuffled(cardCount))
    setSelected([])
    setSwapCount(0)
    setAnimPair(null)
  }, [cardCount])

  return (
    <main className="game">
      <div className="game__header">
        <h1 className="game__title">RightPlace</h1>
        <button className="btn-menu" onClick={onMenu}>Menu</button>
      </div>

      <div className="game__position-numbers">
        {letters.map((_, i) => (
          <span key={i} className="game__position-number">{i + 1}</span>
        ))}
      </div>

      <div className="game__cards">
        {letters.map((letter, i) => (
          <Card
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            letter={letter}
            position={i}
            selected={selected.includes(i)}
            animDx={animPair?.a === i ? animPair.dxA : animPair?.b === i ? animPair.dxB : undefined}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>

      <p className="game__score">
        Correct: <strong>{correct}</strong> of {cardCount}
      </p>

      <div className="game__controls">
        <span className="game__swap-count">Swaps: {swapCount}</span>
        <button
          className="btn-swap"
          disabled={selected.length !== 2 || swapping}
          onClick={handleSwap}
        >
          Swap
        </button>
      </div>

      {won && <WinScreen swapCount={swapCount} onPlayAgain={handlePlayAgain} />}
    </main>
  )
}
