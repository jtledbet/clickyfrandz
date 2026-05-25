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
    win: false,
    score: 0,
    clickedFriends: [],
    roundEnd: false,
    friends: shuffle(FRIENDS),
  }

  roundReset = () => {
    this.setState({
      win: false,
      score: 0,
      clickedFriends: [],
      roundEnd: false,
      friends: shuffle(FRIENDS),
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
    const { score, roundEnd, win, friends } = this.state
    return (
      <div className="App">
        <h1>Clicky Friends</h1>
        <p>Click all the friends, with no duplicates or you lose.</p>
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
