(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Avatar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Avatar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Avatar);
    global.index = mod.exports;
  }
})(this, function (exports, _Avatar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Avatar2 = _interopRequireDefault(_Avatar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Avatar2.default;
});