var _ = require('lodash');
var BoardServerActionCreators = require('../actions/BoardServerActionCreators');
var Utils = require('../lib/Utils');
var RowBuilder = require('../lib/RowBuilder');

module.exports = {
  openCell: function(location) {
    var rows = this.getRows();
    var cell = rows[location.row][location.col];
    cell.isClicked = true;
    cell.isFlagged = false;

    this.clickNeighbors(rows, cell);

    this.setRows(rows);
    BoardServerActionCreators.receiveRows(rows);
  },

  toggleFlagged: function(location) {
    var rows = this.getRows();
    var cell = rows[location.row][location.col];
    cell.isFlagged = !cell.isFlagged;

    this.setRows(rows);
    BoardServerActionCreators.receiveRows(rows);
  },

  clickNeighbors: function(rows, cell) {
    var me = this;
    var neighboringSpots = Utils.neighbors(rows, cell.location.row, cell.location.col);
    var neighboringCells = _.map(neighboringSpots, function(spot) {
      return rows[spot.row][spot.col];
    });
    _.each(neighboringCells, function(neighbor) {
      if (neighbor != cell &&
          !neighbor.isClicked &&
          !neighbor.isBomb &&
          cell.bombCount == 0) {
        neighbor.isClicked = true;
        neighbor.isFlagged = false;
        me.clickNeighbors(rows, neighbor);
      }
    })
  },

  getRows: function() {
    return JSON.parse(localStorage.getItem('rows'));
  },

  setRows: function(rows) {
    localStorage.setItem('rows', JSON.stringify(rows));
  }
};
