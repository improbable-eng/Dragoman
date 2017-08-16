(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './keyCodes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./keyCodes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.keyCodes);
    global.additionalInkTriggerKeys = mod.exports;
  }
})(this, function (exports, _keyCodes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [_keyCodes.UP, _keyCodes.DOWN];
});