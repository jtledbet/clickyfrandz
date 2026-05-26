import { Component } from 'react'
import { FRIENDS, DIFFICULTIES, shuffle } from './shared'

class ClickyFrandz extends Component {
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
        <button className="back-btn" onClick={this.props.onBack}>← Back</button>
        <h1>Clicky Frandz</h1>
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
          {roundEnd && win && <h2>You win!</h2>}
          {!roundEnd && friends.map(f => (
            <img key={f.id} src={f.img} alt={f.name} onClick={() => this.onClick(f.id)} />
          ))}
        </div>
      </div>
    )
  }
}

export default ClickyFrandz
