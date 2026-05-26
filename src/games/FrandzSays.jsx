import { Component } from 'react'
import { FRIENDS, shuffle } from './shared'

const DIFFICULTIES = [
  { label: 'Easy',   count: 3, startLen: 2 },
  { label: 'Medium', count: 4, startLen: 3 },
  { label: 'Hard',   count: 5, startLen: 4 },
]

const HIGHLIGHT_MS = 700
const GAP_MS = 200

function buildSequence(friends, length) {
  const ids = friends.map(f => f.id)
  return Array.from({ length }, () => ids[Math.floor(Math.random() * ids.length)])
}

class FrandzSays extends Component {
  state = {
    difficulty: DIFFICULTIES[0],
    friends: shuffle(FRIENDS).slice(0, 3),
    sequence: [],
    playerIndex: 0,
    showing: false,
    activeId: null,
    score: 0,
    gameOver: false,
  }

  componentDidMount() {
    this.startGame(this.state.difficulty)
  }

  componentWillUnmount() {
    clearTimeout(this._timer)
  }

  startGame = (diff) => {
    const friends = shuffle(FRIENDS).slice(0, diff.count)
    const sequence = buildSequence(friends, diff.startLen)
    this.setState(
      { difficulty: diff, friends, sequence, playerIndex: 0, score: 0, gameOver: false },
      () => this.showSequence()
    )
  }

  showSequence = () => {
    const { sequence } = this.state
    this.setState({ showing: true, activeId: null })

    let t = GAP_MS
    sequence.forEach((id, i) => {
      this._timer = setTimeout(() => this.setState({ activeId: id }), t)
      t += HIGHLIGHT_MS
      this._timer = setTimeout(() => {
        this.setState({ activeId: null })
        if (i === sequence.length - 1) {
          this.setState({ showing: false })
        }
      }, t)
      t += GAP_MS
    })
  }

  onClick = (id) => {
    const { showing, gameOver, sequence, playerIndex, friends, difficulty } = this.state
    if (showing || gameOver) return

    if (id !== sequence[playerIndex]) {
      this.setState({ gameOver: true })
      return
    }

    const nextIndex = playerIndex + 1
    if (nextIndex < sequence.length) {
      this.setState({ playerIndex: nextIndex })
      return
    }

    // Completed the sequence — grow it by one and replay
    const newSeq = [...sequence, buildSequence(friends, 1)[0]]
    this.setState(
      { sequence: newSeq, playerIndex: 0, score: newSeq.length - difficulty.startLen },
      () => this.showSequence()
    )
  }

  render() {
    const { friends, activeId, showing, gameOver, score, difficulty, sequence } = this.state
    return (
      <div className="App">
        <button className="back-btn" onClick={this.props.onBack}>← Back</button>
        <h1>Frandz Says</h1>
        <p>Watch the sequence, then repeat it. Each round adds one more.</p>
        <div className="difficulty">
          {DIFFICULTIES.map(d => (
            <button
              key={d.label}
              className={difficulty.label === d.label ? 'active' : ''}
              onClick={() => this.startGame(d)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <h3>{showing ? 'Watch...' : gameOver ? `Game over — sequence of ${sequence.length}` : `Round ${score + 1}`}</h3>
        <div className="friend-zone">
          {gameOver
            ? <button className="play-again" onClick={() => this.startGame(difficulty)}>Play again</button>
            : friends.map(f => (
                <img
                  key={f.id}
                  src={f.img}
                  alt={f.name}
                  className={activeId === f.id ? 'active' : ''}
                  onClick={() => this.onClick(f.id)}
                  style={{ cursor: showing ? 'default' : 'pointer' }}
                />
              ))
          }
        </div>
      </div>
    )
  }
}

export default FrandzSays
