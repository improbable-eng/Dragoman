(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './FontIcon'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./FontIcon'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.FontIcon);
    global.index = mod.exports;
  }
})(this, function (exports, _FontIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _FontIcon2 = _interopRequireDefault(_FontIcon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _FontIcon2.default;
});