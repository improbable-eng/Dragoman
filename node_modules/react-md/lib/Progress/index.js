(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './LinearProgress', './CircularProgress'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./LinearProgress'), require('./CircularProgress'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.LinearProgress, global.CircularProgress);
    global.index = mod.exports;
  }
})(this, function (exports, _LinearProgress2, _CircularProgress2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CircularProgress = exports.LinearProgress = undefined;

  var _LinearProgress3 = _interopRequireDefault(_LinearProgress2);

  var _CircularProgress3 = _interopRequireDefault(_CircularProgress2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.LinearProgress = _LinearProgress3.default;
  exports.CircularProgress = _CircularProgress3.default;
});