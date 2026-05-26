import dog from '../assets/dog.png'
import cat from '../assets/cat.png'
import bunny from '../assets/bunny.png'
import bird from '../assets/bird.png'
import chinchilla from '../assets/chinchilla.png'

export const FRIENDS = [
  { name: 'dog', img: dog, id: 1 },
  { name: 'cat', img: cat, id: 2 },
  { name: 'bunny', img: bunny, id: 3 },
  { name: 'bird', img: bird, id: 4 },
  { name: 'chinchilla', img: chinchilla, id: 5 },
]

export const DIFFICULTIES = [
  { label: 'Easy', count: 3 },
  { label: 'Medium', count: 4 },
  { label: 'Hard', count: 5 },
]

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
