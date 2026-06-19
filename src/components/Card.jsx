import { forwardRef } from 'react'
import { CARD_TYPES } from '../cardTypes.js'

const Card = forwardRef(function Card({ item, cardType, position, selected, animDx, onClick }, ref) {
  const animating = animDx !== undefined
  const isRainbow = cardType === 'rainbow'
  const isSmallText = !isRainbow && cardType !== 'emojis' && cardType !== 'fruits' && item.length > 1

  const className = [
    'card',
    selected    ? 'card--selected'  : '',
    animating   ? 'card--animating' : '',
    isRainbow   ? 'card--rainbow'   : '',
    isSmallText ? 'card--text-sm'   : '',
  ].filter(Boolean).join(' ')

  let content
  if (isRainbow) {
    const { label, color } = CARD_TYPES.rainbow.meta[item]
    content = (
      <>
        <div className="card__dot" style={{ background: color }} />
        <span className="card__dot-label">{label}</span>
      </>
    )
  } else {
    content = item
  }

  return (
    <div
      ref={ref}
      className={className}
      style={animating ? { '--anim-dx': `${animDx}px` } : undefined}
      onClick={animating ? undefined : onClick}
      aria-label={`${item}, position ${position + 1}${selected ? ', selected' : ''}`}
    >
      {content}
    </div>
  )
})

export default Card
