export function createShuffled(size) {
  const letters = Array.from({ length: size }, (_, i) =>
    String.fromCharCode(65 + i)
  )
  do {
    shuffle(letters)
  } while (score(letters) === size)
  return letters
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

export function score(letters) {
  return letters.filter((l, i) => l === String.fromCharCode(65 + i)).length
}

export function swap(letters, i, j) {
  const next = [...letters]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}
