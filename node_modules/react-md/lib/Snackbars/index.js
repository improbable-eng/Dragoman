(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SnackbarContainer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SnackbarContainer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SnackbarContainer);
    global.index = mod.exports;
  }
})(this, function (exports, _SnackbarContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SnackbarContainer2 = _interopRequireDefault(_SnackbarContainer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _SnackbarContainer2.default;
});