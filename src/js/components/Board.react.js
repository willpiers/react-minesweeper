/** @jsx React.DOM */
var _ = require('lodash');
var React = require('react/addons');
var Cell = require('./Cell.react');
var CellActionCreators = require('../actions/CellActionCreators');

var Board = React.createClass({
  render: function() {
    return (
      <table>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
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
  bombClicked: _.noop,
  zeroClicked: function(row, col) {
    CellActionCreators.receiveClick({
      row: row,
      col: col
    });
  }
});

module.exports = Board;
