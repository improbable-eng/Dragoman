(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Chip'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Chip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Chip);
    global.index = mod.exports;
  }
})(this, function (exports, _Chip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Chip2 = _interopRequireDefault(_Chip);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Chip2.default;
});