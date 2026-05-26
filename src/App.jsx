import { Component } from 'react'
import './App.css'
import ClickyFrandz from './games/ClickyFrandz'
import FrandzSays from './games/FrandzSays'

const GAMES = [
  {
    id: 'clicky',
    title: 'Clicky Frandz',
    description: 'Click each friend exactly once — no repeats.',
  },
  {
    id: 'simon',
    title: 'Frandz Says',
    description: 'Watch the sequence, then repeat it back.',
  },
  {
    id: null,
    title: '???',
    description: 'Coming soon.',
    disabled: true,
  },
]

class App extends Component {
  state = { currentGame: null }

  render() {
    const { currentGame } = this.state
    const back = () => this.setState({ currentGame: null })

    if (currentGame === 'clicky') return <ClickyFrandz onBack={back} />
    if (currentGame === 'simon')  return <FrandzSays  onBack={back} />

    return (
      <div className="home">
        <h1>Frandz</h1>
        <p>Choose a game.</p>
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
