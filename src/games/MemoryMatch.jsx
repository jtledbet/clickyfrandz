import { Component } from 'react'
import { FRIENDS, shuffle } from './shared'

const DIFFICULTIES = [
  { label: 'Easy',   pairs: 3 },
  { label: 'Medium', pairs: 4 },
  { label: 'Hard',   pairs: 5 },
]

function buildDeck(pairs) {
  const animals = shuffle(FRIENDS).slice(0, pairs)
  const cards = []
  animals.forEach((f, i) => {
    cards.push({ id: i * 2,     animalId: f.id, img: f.img, name: f.name })
    cards.push({ id: i * 2 + 1, animalId: f.id, img: f.img, name: f.name })
  })
  return shuffle(cards).map(c => ({ ...c, flipped: false, matched: false }))
}

class MemoryMatch extends Component {
  state = {
    difficulty: DIFFICULTIES[0],
    deck: buildDeck(3),
    flipped: [],     // indices of currently face-up unmatched cards (max 2)
    locked: false,   // true while the "wrong pair" reveal pause is running
    moves: 0,
    won: false,
  }

  setDifficulty = (diff) => {
    this.setState({
      difficulty: diff,
      deck: buildDeck(diff.pairs),
      flipped: [],
      locked: false,
      moves: 0,
      won: false,
    })
  }

  restart = () => {
    const { difficulty } = this.state
    this.setState({
      deck: buildDeck(difficulty.pairs),
      flipped: [],
      locked: false,
      moves: 0,
      won: false,
    })
  }

  onFlip = (idx) => {
    const { deck, flipped, locked, won } = this.state
    if (locked || won) return
    if (deck[idx].flipped || deck[idx].matched) return
    if (flipped.length === 2) return

    const newDeck = deck.map((c, i) => i === idx ? { ...c, flipped: true } : c)
    const newFlipped = [...flipped, idx]

    if (newFlipped.length < 2) {
      this.setState({ deck: newDeck, flipped: newFlipped })
      return
    }

    // Two cards are now face up — check for a match.
    const [a, b] = newFlipped
    const moves = this.state.moves + 1

    if (newDeck[a].animalId === newDeck[b].animalId) {
      const matched = newDeck.map((c, i) =>
        i === a || i === b ? { ...c, matched: true } : c
      )
      const won = matched.every(c => c.matched)
      this.setState({ deck: matched, flipped: [], moves, won })
    } else {
      // Show both face-up briefly, then flip back.
      this.setState({ deck: newDeck, flipped: newFlipped, locked: true, moves }, () => {
        setTimeout(() => {
          this.setState(prev => ({
            deck: prev.deck.map((c, i) =>
              i === a || i === b ? { ...c, flipped: false } : c
            ),
            flipped: [],
            locked: false,
          }))
        }, 900)
      })
    }
  }

  render() {
    const { deck, difficulty, moves, won } = this.state
    const cols = Math.ceil(Math.sqrt(deck.length * 1.5))

    return (
      <div className="App">
        <button className="back-btn" onClick={this.props.onBack}>← Back</button>
        <h1>Memory Match</h1>
        <p>Flip two cards at a time. Match all the pairs to win.</p>
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
        <h3>{won ? `You won in ${moves} moves!` : `Moves: ${moves}`}</h3>
        {won ? (
          <div style={{ marginTop: 16 }}>
            <button className="play-again" onClick={this.restart}>Play again</button>
          </div>
        ) : (
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {deck.map((card, i) => (
              <div
                key={card.id}
                className={`memory-card${card.flipped || card.matched ? ' face-up' : ''}${card.matched ? ' matched' : ''}`}
                onClick={() => this.onFlip(i)}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-back" />
                  <div className="memory-card-front">
                    <img src={card.img} alt={card.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default MemoryMatch
