import { Component } from 'react'
import './App.css'
import dog from './assets/dog.png'
import cat from './assets/cat.png'
import bunny from './assets/bunny.png'
import bird from './assets/bird.png'
import chinchilla from './assets/chinchilla.png'

const FRIENDS = [
  { name: 'dog', img: dog, id: 1 },
  { name: 'cat', img: cat, id: 2 },
  { name: 'bunny', img: bunny, id: 3 },
  { name: 'bird', img: bird, id: 4 },
  { name: 'chinchilla', img: chinchilla, id: 5 },
]

const DIFFICULTIES = [
  { label: 'Easy', count: 3 },
  { label: 'Medium', count: 4 },
  { label: 'Hard', count: 5 },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

class App extends Component {
  state = {
    difficulty: 3,
    win: false,
    score: 0,
    clickedFriends: [],
    roundEnd: false,
    friends: shuffle(FRIENDS).slice(0, 3),
  }

  setDifficulty = (count) => {
    this.setState({
      difficulty: count,
      win: false,
      score: 0,
      clickedFriends: [],
      roundEnd: false,
      friends: shuffle(FRIENDS).slice(0, count),
    })
  }

  roundReset = () => {
    const { difficulty } = this.state
    this.setState({
      win: false,
      score: 0,
      clickedFriends: [],
      roundEnd: false,
      friends: shuffle(FRIENDS).slice(0, difficulty),
    })
  }

  onClick = (id) => {
    const { clickedFriends, score, friends } = this.state

    if (clickedFriends.includes(id)) {
      this.setState({ roundEnd: true })
      setTimeout(this.roundReset, 2000)
      return
    }

    const newScore = score + 1
    const newClicked = [...clickedFriends, id]
    const won = newScore === friends.length

    if (won) setTimeout(this.roundReset, 2000)

    this.setState({
      score: newScore,
      clickedFriends: newClicked,
      friends: shuffle(friends),
      win: won,
      roundEnd: won,
    })
  }

  render() {
    const { score, roundEnd, win, friends, difficulty } = this.state
    return (
      <div className="App">
        <h1>Clicky Friends</h1>
        <p>Click all the friends, with no duplicates or you lose.</p>
        <div className="difficulty">
          {DIFFICULTIES.map(({ label, count }) => (
            <button
              key={count}
              className={difficulty === count ? 'active' : ''}
              onClick={() => this.setDifficulty(count)}
            >
              {label}
            </button>
          ))}
        </div>
        <h3>Score: {score}</h3>
        <div className="friend-zone">
          {roundEnd && !win && <h2>You lose.</h2>}
          {roundEnd && win && <h2>Congratulations, you won!</h2>}
          {!roundEnd && friends.map(f => (
            <img key={f.id} src={f.img} alt={f.name} onClick={() => this.onClick(f.id)} />
          ))}
        </div>
      </div>
    )
  }
}

export default App
