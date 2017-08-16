(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Toolbar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Toolbar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Toolbar);
    global.index = mod.exports;
  }
})(this, function (exports, _Toolbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Toolbar2 = _interopRequireDefault(_Toolbar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Toolbar2.default;
});