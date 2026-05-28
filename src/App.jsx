import { Component } from 'react'
import './App.css'
import BoopTheAminals from './games/BoopTheAminals'
import SteveSays from './games/SteveSays'
import OddOneOut from './games/OddOneOut'

const GAMES = [
  {
    id: 'boop',
    title: 'Boop the Aminals',
    description: 'Boop each aminal exactly once — no double boops.',
  },
  {
    id: 'steve',
    title: 'Steve Says',
    description: 'Crikey! Watch the sequence, then repeat it back.',
  },
  {
    id: 'odd',
    title: 'Odd One Out',
    description: 'Find the animal that doesn\'t belong.',
  },
]

class App extends Component {
  state = { currentGame: null }

  render() {
    const { currentGame } = this.state
    const back = () => this.setState({ currentGame: null })

    if (currentGame === 'boop') return <BoopTheAminals onBack={back} />
    if (currentGame === 'steve') return <SteveSays onBack={back} />
    if (currentGame === 'odd') return <OddOneOut onBack={back} />

    return (
      <div className="home">
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
