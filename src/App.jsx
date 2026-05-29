import { Component } from 'react'
import './App.css'
import BoopTheAbidals from './games/BoopTheAbidals'
import SteveSays from './games/SteveSays'
import MemoryMatch from './games/MemoryMatch'

const GAMES = [
  {
    id: 'boop',
    title: 'Boop the Abidals',
    description: 'Boop each abidal exactly once — no double boops.',
  },
  {
    id: 'steve',
    title: 'Copy Cat',
    description: 'Watch the sequence, then copy it back.',
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Flip cards to find matching pairs. Remember what you\'ve seen.',
  },
]

class App extends Component {
  state = { currentGame: null }

  render() {
    const { currentGame } = this.state
    const back = () => this.setState({ currentGame: null })

    if (currentGame === 'boop') return <BoopTheAbidals onBack={back} />
    if (currentGame === 'steve') return <SteveSays onBack={back} />
    if (currentGame === 'memory') return <MemoryMatch onBack={back} />

    return (
      <div className="home">
        <a className="home-back" href="/portfolio/">← Back to portfolio</a>
        <h1>Shell Games</h1>
        <p>Choose your game.</p>
        <div className="game-cards">
          {GAMES.map(g => (
            <div
              key={g.title}
              className={`game-card${g.disabled ? ' disabled' : ''}`}
              onClick={g.disabled ? undefined : () => this.setState({ currentGame: g.id })}
            >
              <h2>{g.title}</h2>
              <p>{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
