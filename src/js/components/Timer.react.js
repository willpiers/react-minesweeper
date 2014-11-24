/** @jsx React.DOM */
var _ = require('lodash');
var React = require('react/addons');

var Timer = React.createClass({

	getInitialState: function() {
		var secs = JSON.parse(localStorage.getItem('secs'));
		return {
			seconds: secs ? secs : 0,
			timerId: this.newInterval()
		};
	},
	componentWillMount: function(hello) {
		if (!this.props.isRunning) {
			clearInterval(this.state.timerId);
			localStorage.setItem('secs', 0);
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if (!nextProps.isRunning) {
			clearInterval(this.state.timerId);
			localStorage.setItem('secs', 0);
		}
		if (nextProps.isRunning && !this.props.isRunning) {
			this.setState({
				seconds: 0,
				timerId: this.newInterval()
			});
		}
	},
	render: function() {
		return <span className='timer'>{this.state.seconds}</span>;
	},
	newInterval: function() {
		var me = this;
		return setInterval(function() {
			localStorage.setItem('secs', me.state.seconds + 1);
			me.setState({
				seconds: me.state.seconds + 1
			})
		}, 1000);
	}
});

module.exports = Timer;
