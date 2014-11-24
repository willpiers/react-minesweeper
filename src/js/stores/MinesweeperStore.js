var ActionTypes = require('../constants/MinesweeperConstants').ActionTypes;
var MinesweeperDispatcher = require('../dispatcher/MinesweeperDispatcher');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _rows = [];

function isLost(rows) {
  return _.any(rows, function(row) {
    return _.any(row, function(cell) {
      return cell.isClicked && cell.isBomb
    });
  });
}
function isWon(rows) {
  return _.all(rows, function(row) {
    return _.all(row, function(cell) {
      return (cell.isBomb && !cell.isClicked) || (!cell.isBomb && cell.isClicked)
    });
  });
}
function isFreshBoard(rows) {
  return _.all(rows, function(row) {
    return _.all(row, function(cell) {
      return !cell.isClicked;
    });
  });
}

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
      rows: _rows,
      isWon: isWon(_rows),
      isLost: isLost(_rows),
      isFreshBoard: isFreshBoard(_rows)
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
