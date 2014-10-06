/** @jsx React.DOM */

var Board = React.createClass({
  componentWillMount: function() {
    this.addBombCounts();
    this.addLocations();
  },
  render: function() {
    return (
      <table>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  },
  getCells: function(row) {
    var me = this;
    return _.map(row, function(cellInfo) {
      return me.getCellComponent(cellInfo);
    });
  },
  getCellComponent: function(info) {
    return <Cell isBomb={info.isBomb}
                 bombCount={info.bombCount}
                 location={info.location}
                 bombClicked={this.bombClicked}
                 zeroClicked={this.zeroClicked} />;
  },
  getRows: function() {
    var me = this;
    return _.map(this.props.rows, function(row) {
      return (
        <tr>
          {me.getCells(row)}
        </tr>
      );
    })
  },
  bombClicked: _.noop,
  zeroClicked: function(row, col) {
    console.log(row, col);
  },
  eachCell: function(fn) {
    _.each(this.props.rows, function(row, i) {
      _.each(row, function(cell, j) {
        fn(cell, i, j);
      });
    });
  },
  addBombCounts: function() {
    var me = this;
    var rows = me.props.rows;
    me.eachCell(function(cell, i, j) {
      var bombs = _.reduce(me.neighbors(i,j), function(sum, spot) {
        return sum + (rows[spot.row][spot.col].isBomb ? 1 : 0)
      }, 0);
      _.assign(cell, {bombCount: bombs});
    });
  },
  addLocations: function() {
    this.eachCell(function(cell, i, j) {
      _.assign(
        cell,
        {
          location: {
            row: i,
            col: j
          }
        }
      );
    })
  },
  neighbors: function(i,j) {
    var me = this;
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
      return location.row < 0 || location.row >= me.props.rows.length ||
             location.col < 0 || location.col >= me.props.rows.length;
    });
  }
});



function gimmeCells(size) {
  var me = this;
  return _.map(_.range(0, size), function(n) {
      return {isBomb: Math.random() <= 0.3};
  });
}
function gimmeRows(size) {
  var me = this;
  return _.times(size, function(n) {
    return me.gimmeCells(size);
  })
}

React.renderComponent(
  <Board rows={gimmeRows(10)} />,
  document.getElementById('minesweeper')
);
