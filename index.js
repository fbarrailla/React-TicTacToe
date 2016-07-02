const players = ['Player 1', 'Player 2']
const symbols = { [players[0]]: 'X', [players[1]]: 'O' }
const combs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const Block = ({ sym, click, next }) => (
  <div className={'Block'+(sym === '' ? ' empty' : '')} data-next={next} onClick={click}>{sym}</div>
)

const Game = React.createClass({
  getInitialState(){
    return {
      currentPlayer: players[0],
      grid: ['','','','','','','','',''],
      gameOver: false
    }
  },
  play(index) {
    const { grid, currentPlayer: pl, gameOver } = this.state
    if (gameOver || grid[index] !== '') return
    grid[index] = symbols[pl]
    if (this.checkWinner(grid) || !grid.filter(b => b === '').length) {
      this.setState({ grid, gameOver: true })
    } else {
      this.setState({ grid, currentPlayer: players[pl === players[0] ? 1 : 0] })
    }
  },
  replay() {
    this.setState(this.getInitialState())
  },
  checkWinner(g) {
    return combs.map(c => /(XXX|OOO)/.test(c.map(i => g[i]).join(''))).indexOf(true) > -1
  },
  render() {
    const { grid, currentPlayer: pl, gameOver } = this.state
    return (
      <div className="Game">
        {gameOver ? (
          <h1>{!this.checkWinner(grid) ? 'Nobody' : pl} wins !
          <a href="#" onClick={this.replay}>Replay</a></h1>
        ): null}
        {grid.map((sym, index) => (
          <Block key={index} sym={sym} click={() => this.play(index)} next={symbols[pl]} />
        ))}
      </div>
    )
  }
})

ReactDOM.render(<Game />, document.querySelector('#game'))
