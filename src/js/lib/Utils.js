var _ = require('lodash');

module.exports = {
  neighbors: function(rows, i, j) {
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
  },
  eachCell: function(rows, fn) {
    _.each(rows, function(row, i) {
      _.each(row, function(cell, j) {
        fn(cell, i, j);
      });
    });
  }
};