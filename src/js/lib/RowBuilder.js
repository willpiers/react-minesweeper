var _ = require('lodash');

function gimmeCells(size) {
  return _.map(_.range(0, size), function(n) {
      return {
      	isBomb: Math.random() <= 0.25,
      };
  });
};
function gimmeRows(size) {
  return _.times(size, function(n) {
    return gimmeCells(size);
  });
};
function eachCell(fn) {
  _.each(rows, function(row, i) {
    _.each(row, function(cell, j) {
      fn(cell, i, j);
    });
  });
};
function addInfo() {
	eachCell(function(cell, i, j) {
		var bombs = _.reduce(neighbors(i,j), function(sum, spot) {
		  return sum + (rows[spot.row][spot.col].isBomb ? 1 : 0)
		}, 0);
		_.assign(cell, {
			location: {
				row: i,
				col: j
			},
			bombCount: bombs
		})
	});
};
function neighbors(i,j) {
  return _.reject([
    {row: i-1, col: j-1},
    {row: i-1, col: j},
    {row: i-1, col: j+1},
    {row: i, col: j-1},
    {row: i, col: j},
    {row: i, col: j+1},
    {row: i+1, col: j-1},
    {row: i+1, col: j},
    {row: i+1, col: j+1}
  ], function(location) {
    return location.row < 0 || location.row >= rows.length ||
           location.col < 0 || location.col >= rows.length;
  });
};

module.exports = function(size) {
  // localStorage.setItem('rows', JSON.stringify(gimmeRows(size)));
  rows = gimmeRows(size);
  addInfo();
  // return JSON.parse(localStorage.getItem('rows'));
  return rows;
}