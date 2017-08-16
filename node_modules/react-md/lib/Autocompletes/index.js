(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Autocomplete'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Autocomplete'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Autocomplete);
    global.index = mod.exports;
  }
})(this, function (exports, _Autocomplete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Autocomplete2.default;
});