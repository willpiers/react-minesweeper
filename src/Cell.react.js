/** @jsx React.DOM */
var React = require('react');

var Cell = React.createClass({
  getInitialState: function() {
    return {
      isClicked: false
    };
  },
  componentDidUpdate: function() {
    if (this.props.isBomb && this.state.isClicked) {
      this.props.bombClicked();
    }
  },
  render: function() {
    var classes = React.addons.classSet({
      bomb: this.props.isBomb && this.state.isClicked,
      clicked: this.state.isClicked,
      unclicked: !this.state.isClicked
    });
    return this.state.isClicked ?
      <td className={classes}>{this.getClickedMarkup()}</td> :
      <td className={classes} onClick={this.clicked}>{this.getUnclickedMarkup()}</td>;
  },
  getUnclickedMarkup: function() {
    return <span></span>;
  },
  getClickedMarkup: function() {
    var count = this.props.bombCount;
    var i = !this.props.isBomb;
    var color = React.addons.classSet({
      blue: count == 1 && i,
      green: count == 2 && i,
      red: count == 3 && i,
      purple: count == 4 && i,
      maroon: count == 5 && i,
      cyan: count == 6 && i,
      black: count == 7 && i,
      gray: count == 8 && i
    });
    return (
      <span style={{color: color}}>
        {this.props.isBomb ? ' ' : (count == 0 ? ' ' : count)}
      </span>
    );
  },
  clicked: function() {
    var callback = function() {
      if (this.isClickedZero()) {
        var row = this.props.location.row;
        var column = this.props.location.col;
        this.props.zeroClicked(row, column);
      }
    };
    this.setState({
      isClicked: true
    }, callback);
  },
  isClickedZero: function() {
    return this.state.isClicked
      && this.props.bombCount == 0
      && !this.props.isBomb
  }
});

module.exports = Cell;
