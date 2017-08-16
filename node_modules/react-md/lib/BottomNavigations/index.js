(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BottomNavigation'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BottomNavigation'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BottomNavigation);
    global.index = mod.exports;
  }
})(this, function (exports, _BottomNavigation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _BottomNavigation2 = _interopRequireDefault(_BottomNavigation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _BottomNavigation2.default;
});