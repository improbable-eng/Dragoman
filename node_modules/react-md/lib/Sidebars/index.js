(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Sidebar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Sidebar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Sidebar);
    global.index = mod.exports;
  }
})(this, function (exports, _Sidebar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Sidebar2 = _interopRequireDefault(_Sidebar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Sidebar2.default;
});