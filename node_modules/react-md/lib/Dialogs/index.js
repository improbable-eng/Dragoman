(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DialogContainer', './Dialog'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DialogContainer'), require('./Dialog'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DialogContainer, global.Dialog);
    global.index = mod.exports;
  }
})(this, function (exports, _DialogContainer, _Dialog2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dialog = undefined;

  var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

  var _Dialog3 = _interopRequireDefault(_Dialog2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _DialogContainer2.default;
  exports.Dialog = _Dialog3.default;
});