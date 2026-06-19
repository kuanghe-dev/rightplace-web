export function createShuffled(canonical) {
  const arr = [...canonical]
  do {
    shuffle(arr)
  } while (score(arr, canonical) > 1)
  return arr
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

export function score(current, canonical) {
  return current.filter((item, i) => item === canonical[i]).length
}

export function swap(arr, i, j) {
  const next = [...arr]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}
