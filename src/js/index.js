/** @jsx React.DOM */
var React = require('react');
var Board = require('./components/Board.react');
var RowBuilder = require('./lib/RowBuilder');
var MinesweeperStore = require('./stores/MinesweeperStore');
require('../style/base.css');


React.renderComponent(
  <Board rows={RowBuilder(10)} />,
  document.getElementById('minesweeper')
);