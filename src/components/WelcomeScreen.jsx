import { useState } from 'react'
import { CARD_TYPES, TYPE_ORDER } from '../cardTypes.js'

const CARD_COUNTS = [3, 4, 5, 6, 7]

export default function WelcomeScreen({ onStart }) {
  const [cardCount, setCardCount] = useState(5)
  const [cardType, setCardType] = useState('letters')

  return (
    <div className="welcome">
      <h1 className="welcome__title">RightPlace</h1>
      <p className="welcome__tagline">
        Sort the cards into the correct order — one swap at a time.
      </p>

      <section className="welcome__how">
        <h2 className="welcome__how-title">How to Play</h2>
        <ol className="welcome__steps">
          <li>Cards are dealt in a shuffled order.</li>
          <li>Click any two cards to select them, then click <strong>Swap</strong>.</li>
          <li>After each swap you'll see how many cards are now in the correct position.</li>
          <li>Keep swapping until every card is in its right place. Fewest swaps wins!</li>
        </ol>
      </section>

      <section className="welcome__setup">
        <p className="welcome__setup-label">Card content</p>
        <div className="welcome__type-row">
          {TYPE_ORDER.map(type => (
            <button
              key={type}
              className={`welcome__type-btn${cardType === type ? ' welcome__type-btn--active' : ''}`}
              onClick={() => setCardType(type)}
            >
              <span className="welcome__type-emoji">{CARD_TYPES[type].emoji}</span>
              <span className="welcome__type-name">{CARD_TYPES[type].label}</span>
              <span className="welcome__type-hint">{CARD_TYPES[type].hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="welcome__setup">
        <p className="welcome__setup-label">Number of cards</p>
        <div className="welcome__count-row">
          {CARD_COUNTS.map(n => (
            <button
              key={n}
              className={`welcome__count-btn${cardCount === n ? ' welcome__count-btn--active' : ''}`}
              onClick={() => setCardCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <button className="btn-start" onClick={() => onStart({ cardCount, cardType })}>
        Start Game
      </button>
    </div>
  )
}
