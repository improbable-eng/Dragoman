(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Subheader'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Subheader'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Subheader);
    global.index = mod.exports;
  }
})(this, function (exports, _Subheader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Subheader2 = _interopRequireDefault(_Subheader);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Subheader2.default;
});