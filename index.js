/** @jsx React.DOM */
var React = require('react');
var Board = require('./src/Board.react');
require('./src/style/base.css');


function gimmeCells(size) {
  return _.map(_.range(0, size), function(n) {
      return {isBomb: Math.random() <= 0.25};
  });
}
function gimmeRows(size) {
  return _.times(size, function(n) {
    return gimmeCells(size);
  });
}

React.renderComponent(
  <Board rows={gimmeRows(10)} />,
  document.getElementById('minesweeper')
);