(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SpeedDial'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SpeedDial'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SpeedDial);
    global.index = mod.exports;
  }
})(this, function (exports, _SpeedDial2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpeedDial = undefined;

  var _SpeedDial3 = _interopRequireDefault(_SpeedDial2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.SpeedDial = _SpeedDial3.default;
});