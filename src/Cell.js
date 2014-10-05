/** @jsx React.DOM */
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
    if (this.state.isClicked) {
      return <td className='clicked'>{this.getClickedMarkup()}</td>;
    } else {
      return <td onClick={this.clicked} className="unclicked">{this.getUnclickedMarkup()}</td>;
    }
  },
  getUnclickedMarkup: function() {
    return <span></span>;
  },
  getClickedMarkup: function() {
    return <span>{this.props.isBomb ? 'B' : this.props.bombCount}</span>;
  },

  clicked: function() {
    this.setState({
      isClicked: true
    });
  }
});
