var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var MinesweeperConstants = require('../constants/MinesweeperConstants');

var ActionTypes = MinesweeperConstants.ActionTypes;

module.exports = {
  receiveClick: function(cellInfo) {
    MinesweeperDispatcher.handleViewAction({
      type: ActionTypes.RECEIVE_CLICK,
      cellInfo: cellInfo
    });
  }
};