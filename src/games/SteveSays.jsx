import { Component } from 'react'
import { FRIENDS, shuffle } from './shared'
import { playNote, playBuzzer } from './sound'

const DIFFICULTIES = [
  { label: 'Easy',   count: 3, startLen: 2 },
  { label: 'Medium', count: 4, startLen: 3 },
  { label: 'Hard',   count: 5, startLen: 4 },
]

const HIGHLIGHT_MS = 700
const GAP_MS = 200
const PRESS_MS = 180

function buildSequence(friends, length) {
  const ids = friends.map(f => f.id)
  return Array.from({ length }, () => ids[Math.floor(Math.random() * ids.length)])
}

class SteveSays extends Component {
  state = {
    difficulty: DIFFICULTIES[0],
    friends: shuffle(FRIENDS).slice(0, 3),
    sequence: [],
    playerIndex: 0,
    showing: false,
    activeId: null,   // lit during playback
    pressedId: null,  // lit briefly when the player taps
    score: 0,
    gameOver: false,
    muted: false,
  }

  _timers = []

  componentDidMount() {
    this.startGame(this.state.difficulty)
  }

  componentWillUnmount() {
    this.clearTimers()
  }

  clearTimers = () => {
    this._timers.forEach(clearTimeout)
    this._timers = []
  }

  beep = (id) => {
    if (!this.state.muted) playNote(id)
  }

  startGame = (diff) => {
    this.clearTimers()
    const friends = shuffle(FRIENDS).slice(0, diff.count)
    const sequence = buildSequence(friends, diff.startLen)
    this.setState(
      { difficulty: diff, friends, sequence, playerIndex: 0, score: 0, gameOver: false, pressedId: null },
      () => this.showSequence()
    )
  }

  showSequence = () => {
    const { sequence } = this.state
    this.setState({ showing: true, activeId: null })

    let t = GAP_MS
    sequence.forEach((id, i) => {
      this._timers.push(setTimeout(() => {
        this.setState({ activeId: id })
        this.beep(id)
      }, t))
      t += HIGHLIGHT_MS
      this._timers.push(setTimeout(() => {
        this.setState({ activeId: null })
        if (i === sequence.length - 1) this.setState({ showing: false })
      }, t))
      t += GAP_MS
    })
  }

  onClick = (id) => {
    const { showing, gameOver, sequence, playerIndex, friends, difficulty } = this.state
    if (showing || gameOver) return

    // Tactile + audio feedback for every tap.
    this.setState({ pressedId: id })
    this._timers.push(setTimeout(() => this.setState({ pressedId: null }), PRESS_MS))

    if (id !== sequence[playerIndex]) {
      if (!this.state.muted) playBuzzer()
      this.setState({ gameOver: true })
      return
    }

    this.beep(id)

    const nextIndex = playerIndex + 1
    if (nextIndex < sequence.length) {
      this.setState({ playerIndex: nextIndex })
      return
    }

    const newSeq = [...sequence, buildSequence(friends, 1)[0]]
    this.setState(
      { sequence: newSeq, playerIndex: 0, score: newSeq.length - difficulty.startLen },
      () => this.showSequence()
    )
  }

  render() {
    const { friends, activeId, pressedId, showing, gameOver, score, difficulty, sequence, muted } = this.state
    return (
      <div className="App">
        <button className="back-btn" onClick={this.props.onBack}>← Back</button>
        <h1>Copy Cat</h1>
        <p>Watch the sequence, then copy it back. Each round adds one more.</p>
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
          <button
            className="mute-btn"
            onClick={() => this.setState({ muted: !muted })}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
        <h3>
          {showing
            ? 'Watch closely...'
            : gameOver
            ? `Not bad! You made it to ${sequence.length} in a row.`
            : `Round ${score + 1}`}
        </h3>
        <div className="friend-zone">
          {gameOver
            ? <button className="play-again" onClick={() => this.startGame(difficulty)}>Try again</button>
            : friends.map(f => {
                const cls = [
                  activeId === f.id ? 'active' : '',
                  pressedId === f.id ? 'pressed' : '',
                ].filter(Boolean).join(' ')
                return (
                  <img
                    key={f.id}
                    src={f.img}
                    alt={f.name}
                    className={cls}
                    onClick={() => this.onClick(f.id)}
                    style={{ cursor: showing ? 'default' : 'pointer' }}
                  />
                )
              })
          }
        </div>
      </div>
    )
  }
}

export default SteveSays
