/** @jsx React.DOM */

var Board = React.createClass({
  componentWillMount: function() {
    this.addBombCounts(this.props.rows)
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
                 bombClicked={this.bombClicked} />;
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
  bombClicked: function() {
    alert('loser');
  },
  addBombCounts: function() {
    var rows = this.props.rows;
    var me = this;
    _.each(rows, function(row, i) {
      _.each(row, function(cell, j) {
        var bombs = _.reduce(me.validNeighborLocations(i,j), function(sum, location) {
          return sum + (rows[location.row][location.col].isBomb ? 1 : 0)
        }, 0);
        return _.assign(cell, {bombCount: bombs});
      })
    })
  },
  validNeighborLocations: function(i,j) {
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
      return {isBomb: Math.random() <= 0.33};
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
