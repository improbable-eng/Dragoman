(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Slider'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Slider'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Slider);
    global.index = mod.exports;
  }
})(this, function (exports, _Slider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Slider2 = _interopRequireDefault(_Slider);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Slider2.default;
});