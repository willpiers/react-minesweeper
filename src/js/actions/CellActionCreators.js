var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var MinesweeperConstants = require('../constants/MinesweeperConstants');
var MinesweeperAPI = require('../apis/MinesweeperAPI');

var ActionTypes = MinesweeperConstants.ActionTypes;

module.exports = {
  receiveClick: function(location) {
    MinesweeperDispatcher.handleViewAction({
      type: ActionTypes.RECEIVE_CLICK,
      location: location
    });
    MinesweeperAPI.openCell(location);
  },

  receiveRightClick: function(location) {
  	MinesweeperDispatcher.handleViewAction({
  	  type: ActionTypes.RECEIVE_RIGHT_CLICK,
  	  location: location
  	});
  	MinesweeperAPI.toggleFlagged(location);
  }
};
