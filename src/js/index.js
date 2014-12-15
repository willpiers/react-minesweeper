/** @jsx React.DOM */
var React = require('react');
var Board = require('./components/Board.react');
var RowBuilder = require('./lib/RowBuilder');
var MinesweeperStore = require('./stores/MinesweeperStore');
var MinesweeperAPI = require('./apis/MinesweeperAPI');
require('../style/base.less');

var rows = MinesweeperAPI.getRows();
if (!rows || rows.length == 0) {
	rows = RowBuilder(10);
}
MinesweeperAPI.setRows(rows);

var state = MinesweeperStore.getState();
var el = document.getElementById('minesweeper');
el.style.width = (state.rows.length * 31 + 1).toString() + "px";
React.renderComponent(
  <Board rows={state.rows} isWon={state.isWon} isLost={state.isLost} />, el
);
