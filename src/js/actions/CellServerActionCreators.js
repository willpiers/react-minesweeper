var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var MinesweeperConstants = require('../constants/MinesweeperConstants');
var MinesweeperAPI = require('../apis/MinesweeperAPI');

var ActionTypes = MinesweeperConstants.ActionTypes;

module.exports = {
  receiveRows: function(rows) {
    MinesweeperDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ROWS,
      rows: rows
    });
  }
};