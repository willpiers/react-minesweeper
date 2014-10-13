var _ = require('lodash');
var CellServerActionCreators = require('../actions/CellServerActionCreators');
var Utils = require('../lib/Utils');

module.exports = {
  openCell: function(location) {
    var rows = this.getRows();
    var cell = rows[location.row][location.col];
    cell.isClicked = true;

    this.clickNeighbors(rows, cell);

    this.setRows(rows);
    CellServerActionCreators.receiveRows(rows);
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