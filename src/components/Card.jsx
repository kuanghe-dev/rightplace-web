import { forwardRef } from 'react'

const Card = forwardRef(function Card({ letter, position, selected, animDx, onClick }, ref) {
  const animating = animDx !== undefined
  const className = [
    'card',
    selected ? 'card--selected' : '',
    animating ? 'card--animating' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={ref}
      className={className}
      style={animating ? { '--anim-dx': `${animDx}px` } : undefined}
      onClick={animating ? undefined : onClick}
      aria-label={`Card ${letter}, position ${position + 1}${selected ? ', selected' : ''}`}
    >
      {letter}
    </div>
  )
})

export default Card
