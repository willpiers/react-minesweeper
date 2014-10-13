/** @jsx React.DOM */
var React = require('react');
var Board = require('./components/Board.react');
var RowBuilder = require('./lib/RowBuilder');
var MinesweeperStore = require('./stores/MinesweeperStore');
var MinesweeperAPI = require('./apis/MinesweeperAPI');
require('../style/base.css');

if (!MinesweeperAPI.getRows()) {
	MinesweeperAPI.setRows(RowBuilder(10));
}

React.renderComponent(
  <Board rows={MinesweeperAPI.getRows()} />,
  document.getElementById('minesweeper')
);