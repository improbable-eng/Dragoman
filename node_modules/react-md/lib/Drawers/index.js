(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Drawer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Drawer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawer);
    global.index = mod.exports;
  }
})(this, function (exports, _Drawer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Drawer2 = _interopRequireDefault(_Drawer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Drawer2.default;
});