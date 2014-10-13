var _ = require('lodash');
var Utils = require('./Utils.js');

function gimmeCells(size) {
  return _.map(_.range(0, size), function(n) {
      return {
        isBomb: Math.random() <= 0.25
      };
  });
};
function gimmeRows(size) {
  return _.times(size, function(n) {
    return gimmeCells(size);
  });
};
function addInfo(rows) {
  Utils.eachCell(rows, function(cell, i, j) {
    var bombs = _.reduce(Utils.neighbors(rows, i, j), function(sum, spot) {
      return sum + (rows[spot.row][spot.col].isBomb ? 1 : 0)
    }, 0);
    _.assign(cell, {
      location: {
        row: i,
        col: j
      },
      bombCount: bombs,
      isClicked: false
    })
  });
};

module.exports = function(size) {
  var rows = gimmeRows(size);
  addInfo(rows);
  return rows;
}