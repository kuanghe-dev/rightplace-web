import { useState, useRef, useCallback, useMemo } from 'react'
import { createShuffled, score, swap } from '../game.js'
import { CARD_TYPES } from '../cardTypes.js'
import Card from './Card.jsx'
import WinScreen from './WinScreen.jsx'

export default function GameBoard({ cardCount, cardType, onMenu }) {
  const canonical = useMemo(
    () => CARD_TYPES[cardType].items.slice(0, cardCount),
    [cardType, cardCount]
  )

  const [cards, setCards] = useState(() => createShuffled(canonical))
  const [selected, setSelected] = useState([])
  const [swapCount, setSwapCount] = useState(0)
  const [animPair, setAnimPair] = useState(null) // { a, b, dxA, dxB }
  const cardRefs = useRef([])

  const correct = score(cards, canonical)
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
      setCards(prev => swap(prev, a, b))
      setSwapCount(c => c + 1)
      setAnimPair(null)
    }, 300)
  }, [selected, swapping])

  const handlePlayAgain = useCallback(() => {
    setCards(createShuffled(canonical))
    setSelected([])
    setSwapCount(0)
    setAnimPair(null)
  }, [canonical])

  return (
    <main className="game" style={{ '--card-count': cardCount }}>
      <div className="game__header">
        <h1 className="game__title">RightPlace</h1>
        <button className="btn-menu" onClick={onMenu}>Menu</button>
      </div>

      <div className="game__position-numbers">
        {cards.map((_, i) => (
          <span key={i} className="game__position-number">{i + 1}</span>
        ))}
      </div>

      <div className="game__cards">
        {cards.map((item, i) => (
          <Card
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            item={item}
            cardType={cardType}
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
