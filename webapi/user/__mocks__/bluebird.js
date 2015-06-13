'use strict';

var SyncPromise = function(pfn) {
  var _this = this;
  _this.isResolved = false;
  _this.args = [];

  pfn(function() {
    _this.args = arguments;
    _this.isResolved = true;
  }, function() {
    _this.args = arguments;
    _this.isResolved = false;
  });
};
SyncPromise.prototype.then = function (cb) {
  if (this.isResolved) {
    var ret = cb.apply(null, this.args);
    return ret ? ret : this;
  }
  return this;
};
SyncPromise.prototype.catch = function (cb) {
  if (!this.isResolved) {
    cb.apply(null, this.args);
  }
  return this;
};

module.exports = SyncPromise;
