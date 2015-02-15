/** @jsx React.DOM */
var _ = require('lodash');
var React = require('react/addons');
var fastclick = require('fastclick');
var Cell = require('./Cell.react');
var Timer = require('./Timer.react');
var CellActionCreators = require('../actions/CellActionCreators');
var BoardActionCreators = require('../actions/BoardActionCreators');
var MinesweeperStore = require('../stores/MinesweeperStore');

var Board = React.createClass({
  getInitialState: function() {
    return {
      rows: this.props.rows,
      isLost: this.props.isLost,
      isWon: this.props.isWon
    };
  },
  componentDidMount: function() {
    fastclick.attach(document.body);
    MinesweeperStore.addChangeListener(this._onChange, this);
  },
  render: function() {
    var classes = React.addons.classSet({
      'game-lost': this.state.isLost,
      'game-won': this.state.isWon,
      'title': true
    });
    var storeState = MinesweeperStore.getState();
    var isRunning = !storeState.isLost && !storeState.isWon && !storeState.isFreshBoard;
    var cells = _.flatten(this.state.rows);
    var totalBombs = _.filter(cells, function(c) { return c.isBomb }).length;
    var totalFlags = _.filter(cells, function(c) { return c.isFlagged }).length;
    return (
      <div>
        <div id='header'>
          <span className="bombs-remaining digital">{totalBombs - totalFlags}</span>
          <h3>
            <span onClick={this.resetSmaller} className='size-control'>-</span>
            <span onClick={this.reset} title='Reset' className={classes}>Sweeper</span>
            <span onClick={this.resetBigger} className='size-control'>+</span>
          </h3>
          <Timer isRunning={isRunning} />
        </div>
        <table>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
        <div id='footer'>
          <form onSubmit={this.showHelp}>
            <button id='help-btn'>Halp!</button>
          </form>
          <a target='_blank' href='http://github.com/willpiers/react-minesweeper'>
            <img id='github-logo' src='src/images/github.png'/>
          </a>
        </div>
      </div>
    );
  },
  showHelp: function(e) {
    e.preventDefault();
    alert("The purpose of the game is to open all the cells of the board which do not contain a bomb.\n\nYou lose if you set off a bomb cell.\n\nEvery non-bomb cell you open will tell you the total number of bombs in the eight neighboring cells.\n\nOnce you are sure that a cell contains a bomb, you can right-click to put a flag it on it as a reminder.\n\nTo start a new game (abandoning the current one), just click on the text that says 'Sweeper' at the top.\n\nUse the \"+\" and \"-\" buttons to change the size of the board.\n\n\nHappy mine hunting!");
  },
  getRows: function() {
    var me = this;
    return _.map(this.state.rows, function(row) {
      return (
        <tr>
          {me.getCells(row)}
        </tr>
      );
    })
  },
  getCells: function(row) {
    var me = this;
    return _.map(row, function(cellInfo) {
      return me.getCellComponent(cellInfo);
    });
  },
  getCellComponent: function(info) {
    return <Cell isBomb={info.isBomb}
                 isClicked={info.isClicked}
                 isFlagged={info.isFlagged}
                 bombCount={info.bombCount}
                 location={info.location}
                 onRightClick={this.cellRightClicked}
                 onOpen={this.cellClicked} />;
  },
  _onChange: function() {
    var state = MinesweeperStore.getState()
    this.setState({
      rows: state.rows,
      isLost: state.isLost,
      isWon: state.isWon
    }, function() {
      var board = this.getDOMNode().parentNode;
      board.style.width = (this.state.rows.length * 31 + 1).toString() + "px";
    });
  },
  cellClicked: function(location) {
    CellActionCreators.receiveClick(location);
  },
  cellRightClicked: function(location) {
    CellActionCreators.receiveRightClick(location);
  },
  reset: function(e) {
    e.preventDefault();
    BoardActionCreators.receiveReset(this.state.rows.length);
  },
  resetBigger: function(e) {
    e.preventDefault();
    BoardActionCreators.receiveReset(this.state.rows.length + 1);
  },
  resetSmaller: function(e) {
    e.preventDefault();
    BoardActionCreators.receiveReset(this.state.rows.length - 1);
  }
});

module.exports = Board;
