'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (i) {
  'use strict';

  var _symbols;

  var players = ['Player 1', 'Player 2'];
  var symbols = (_symbols = {}, _defineProperty(_symbols, players[0], 'X'), _defineProperty(_symbols, players[1], 'O'), _symbols);
  var combs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  var Block = function Block(_ref) {
    var sym = _ref.sym;
    var click = _ref.click;
    var next = _ref.next;
    return React.createElement(
      'div',
      { className: 'Block' + (sym === '' ? ' empty' : ''), 'data-next': next, onClick: click },
      sym
    );
  };
  var Game = React.createClass({
    getInitialState: function getInitialState() {
      return {
        currentPlayer: players[i++ % 2],
        grid: ['', '', '', '', '', '', '', '', ''],
        gameOver: false
      };
    },
    play: function play(index) {
      var _state = this.state;
      var grid = _state.grid;
      var pl = _state.currentPlayer;
      var gameOver = _state.gameOver;

      if (gameOver || grid[index] !== '') return;
      grid[index] = symbols[pl];
      if (this.checkWinner(grid) || !grid.filter(function (b) {
        return b === '';
      }).length) {
        this.setState({ grid: grid, gameOver: true });
      } else {
        this.setState({ grid: grid, currentPlayer: players[pl === players[0] ? 1 : 0] });
      }
    },
    replay: function replay() {
      this.setState(this.getInitialState());
    },
    checkWinner: function checkWinner(g) {
      return combs.map(function (c) {
        return (/(XXX|OOO)/.test(c.map(function (i) {
            return g[i];
          }).join(''))
        );
      }).indexOf(true) > -1;
    },
    render: function render() {
      var _this = this;

      var _state2 = this.state;
      var grid = _state2.grid;
      var pl = _state2.currentPlayer;
      var gameOver = _state2.gameOver;

      return React.createElement(
        'div',
        { className: 'Game' },
        gameOver ? React.createElement(
          'h1',
          null,
          !this.checkWinner(grid) ? 'Nobody' : pl,
          ' wins !',
          React.createElement(
            'a',
            { href: '#', onClick: this.replay },
            'Replay'
          )
        ) : null,
        grid.map(function (sym, index) {
          return React.createElement(Block, { key: index, sym: sym, click: function click() {
              return _this.play(index);
            }, next: symbols[pl] });
        })
      );
    }
  });
  ReactDOM.render(React.createElement(Game, null), document.querySelector('#game'));
})(0);
