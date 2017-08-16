(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Badge'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Badge'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Badge);
    global.index = mod.exports;
  }
})(this, function (exports, _Badge) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Badge2 = _interopRequireDefault(_Badge);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Badge2.default;
});