(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './TextField'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./TextField'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.TextField);
    global.index = mod.exports;
  }
})(this, function (exports, _TextField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _TextField2 = _interopRequireDefault(_TextField);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _TextField2.default;
});