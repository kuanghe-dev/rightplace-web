export const CARD_TYPES = {
  letters: {
    label: 'Letters',
    emoji: '🔤',
    hint: 'A → G',
    items: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  rainbow: {
    label: 'Rainbow',
    emoji: '🌈',
    hint: 'Red → Violet',
    items: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
    meta: {
      red:    { label: 'Red',    color: '#EF4444' },
      orange: { label: 'Orange', color: '#F97316' },
      yellow: { label: 'Yellow', color: '#EAB308' },
      green:  { label: 'Green',  color: '#22C55E' },
      blue:   { label: 'Blue',   color: '#3B82F6' },
      indigo: { label: 'Indigo', color: '#6366F1' },
      violet: { label: 'Violet', color: '#A855F7' },
    },
  },
  weekdays: {
    label: 'Weekdays',
    emoji: '📅',
    hint: 'Mon → Sun',
    items: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  planets: {
    label: 'Planets',
    emoji: '🪐',
    hint: 'Mercury → Uranus',
    items: ['Mer', 'Ven', 'Ear', 'Mar', 'Jup', 'Sat', 'Ura'],
  },
  notes: {
    label: 'Notes',
    emoji: '🎵',
    hint: 'Do → Ti',
    items: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  },
}

export const TYPE_ORDER = ['letters', 'rainbow', 'weekdays', 'planets', 'notes']
