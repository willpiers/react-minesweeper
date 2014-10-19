/** @jsx React.DOM */
var _ = require('lodash');
var React = require('react/addons');

var Timer = React.createClass({
	getInitialState: function() {
		return {
			seconds: 0
		};
	},
	render: function() {
		return <span>{this.state.seconds}</span>;
	},
	componentDidMount: function() {
		var me = this;
		setInterval(function() {
			me.setState({
				seconds: me.state.seconds + 1
			})
		}, 1000);
	}
});

module.exports = Timer;
