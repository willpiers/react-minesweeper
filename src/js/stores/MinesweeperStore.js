var ActionTypes = require('../constants/MinesweeperConstants').ActionTypes;
var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

localStorage.cells = [];

var MinesweeperStore = merge(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  openCell: function(info) {
    console.log('row', info.row);
    console.log('col', info.col);
  }
});

MinesweeperStore.dispatchToken = MinesweeperDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case ActionTypes.RECEIVE_CLICK:
      MinesweeperStore.openCell(action.cellInfo);
      break;

    default:
      // do nothing
  }
});

module.exports = MinesweeperStore;