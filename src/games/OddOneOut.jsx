import { Component } from 'react'
import { FRIENDS, shuffle } from './shared'

const DIFFICULTIES = [
  { label: 'Easy',   size: 3 },
  { label: 'Medium', size: 4 },
  { label: 'Hard',   size: 5 },
]

function buildGrid(size) {
  const total = size * size
  const [majority, odd] = shuffle(FRIENDS)
  const oddIndex = Math.floor(Math.random() * total)
  return Array.from({ length: total }, (_, i) =>
    i === oddIndex ? { ...odd, isOdd: true } : { ...majority, isOdd: false }
  )
}

class OddOneOut extends Component {
  state = {
    difficulty: DIFFICULTIES[0],
    grid: buildGrid(3),
    score: 0,
    gameOver: false,
  }

  setDifficulty = (diff) => {
    this.setState({ difficulty: diff, grid: buildGrid(diff.size), score: 0, gameOver: false })
  }

  onClick = (cell) => {
    const { difficulty, score, gameOver } = this.state
    if (gameOver) return
    if (cell.isOdd) {
      this.setState({ score: score + 1, grid: buildGrid(difficulty.size) })
    } else {
      this.setState({ gameOver: true })
    }
  }

  render() {
    const { grid, score, gameOver, difficulty } = this.state
    return (
      <div className="App">
        <button className="back-btn" onClick={this.props.onBack}>← Back</button>
        <h1>Odd One Out</h1>
        <p>Find the animal that doesn't belong. Click the wrong one and you're done.</p>
        <div className="difficulty">
          {DIFFICULTIES.map(d => (
            <button
              key={d.label}
              className={difficulty.label === d.label ? 'active' : ''}
              onClick={() => this.setDifficulty(d)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <h3>Score: {score}</h3>
        {gameOver ? (
          <div className="friend-zone" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h2>Wrong one!</h2>
            <button
              className="play-again"
              onClick={() => this.setState({ score: 0, gameOver: false, grid: buildGrid(difficulty.size) })}
            >
              Try again
            </button>
          </div>
        ) : (
          <div
            className="odd-grid"
            style={{ gridTemplateColumns: `repeat(${difficulty.size}, 1fr)` }}
          >
            {grid.map((cell, i) => (
              <img
                key={i}
                src={cell.img}
                alt={cell.name}
                onClick={() => this.onClick(cell)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default OddOneOut
