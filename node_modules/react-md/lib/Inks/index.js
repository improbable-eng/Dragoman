(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './injectInk'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./injectInk'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.injectInk);
    global.index = mod.exports;
  }
})(this, function (exports, _injectInk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _injectInk2 = _interopRequireDefault(_injectInk);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _injectInk2.default;
});