/** @jsx React.DOM */
var React = require('react');
var Board = require('./components/Board.react');
var RowBuilder = require('./lib/RowBuilder');
var MinesweeperStore = require('./stores/MinesweeperStore');
var MinesweeperAPI = require('./apis/MinesweeperAPI');
require('../style/base.css');

var rows = MinesweeperAPI.getRows();
if (!rows || rows.length == 0) {
	rows = RowBuilder(4);
}
MinesweeperAPI.setRows(rows);

var state = MinesweeperStore.getState();
React.renderComponent(
  <Board rows={state.rows} isWon={state.isWon} isLost={state.isLost} />,
  document.getElementById('minesweeper')
);
