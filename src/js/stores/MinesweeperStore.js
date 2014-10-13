var ActionTypes = require('../constants/MinesweeperConstants').ActionTypes;
var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _rows = [];

var MinesweeperStore = merge(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  receiveRows: function(rows) {
    _rows = rows;
    this.emitChange();
  },
  getState: function() {
    return {
      rows: _rows
    }
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

MinesweeperStore.dispatchToken = MinesweeperDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.RECEIVE_ROWS:
      MinesweeperStore.receiveRows(action.rows);
      break;

    default:
      // do nothing
  }
});

module.exports = MinesweeperStore;