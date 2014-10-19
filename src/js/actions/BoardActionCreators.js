var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var MinesweeperConstants = require('../constants/MinesweeperConstants');
var MinesweeperAPI = require('../apis/MinesweeperAPI');

var ActionTypes = MinesweeperConstants.ActionTypes;

module.exports = {
  receiveReset: function(size) {
    MinesweeperDispatcher.handleViewAction({
      type: ActionTypes.RECEIVE_BOARD_RESET,
      size: size
    });
    MinesweeperAPI.resetRows(size);
  }
};
