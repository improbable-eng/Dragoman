(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SelectField'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SelectField'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SelectField);
    global.index = mod.exports;
  }
})(this, function (exports, _SelectField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SelectField2 = _interopRequireDefault(_SelectField);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _SelectField2.default;
});