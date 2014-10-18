/** @jsx React.DOM */
var React = require('react');

var Cell = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      bomb: this.props.isBomb && this.props.isClicked,
      clicked: this.props.isClicked,
      unclicked: !this.props.isClicked,
      flagged: this.props.isFlagged
    });
    return this.props.isClicked ?
      <td className={classes}>{this.getClickedMarkup()}</td> :
      <td className={classes} onClick={this.propagateClick}
                              onContextMenu={this.propagateRightClick}>
          {this.getUnclickedMarkup()}
      </td>;
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
  propagateClick: function(e) {
    if (!this.props.isFlagged) {
      this.props.onOpen(this.props.location);
    }
  },
  propagateRightClick: function(e) {
    e.preventDefault();
    this.props.onRightClick(this.props.location)
  }
});

module.exports = Cell;
