(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Paper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Paper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Paper);
    global.index = mod.exports;
  }
})(this, function (exports, _Paper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Paper2 = _interopRequireDefault(_Paper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Paper2.default;
});