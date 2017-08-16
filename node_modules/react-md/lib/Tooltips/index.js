(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './injectTooltip'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./injectTooltip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.injectTooltip);
    global.index = mod.exports;
  }
})(this, function (exports, _injectTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _injectTooltip2 = _interopRequireDefault(_injectTooltip);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _injectTooltip2.default;
});