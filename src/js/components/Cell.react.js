/** @jsx React.DOM */
var React = require('react');
var colors = ['#ff00ff','#00ffff','#00ff00','#ffff00','#ff0000','#0000ff'];

var Cell = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.isClicked !== this.props.isClicked || nextProps.isFlagged !== this.props.isFlagged;
  },

  render: function() {
    var classes = React.addons.classSet({
      bomb: this.props.isBomb && this.props.isClicked,
      clicked: this.props.isClicked,
      unclicked: !this.props.isClicked,
      flagged: this.props.isFlagged
    });
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    var flaggedStyle = {"background-color": this.props.isFlagged ? randomColor : '#444'};
    return this.props.isClicked ?
      <td className={classes}>{this.getClickedMarkup()}</td> :
      <td className={classes} onClick={this.propagateClick}
                              onContextMenu={this.propagateRightClick}
                              style={flaggedStyle}>
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
