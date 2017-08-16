(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './AccessibleFakeButton', '../Inks/injectInk'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./AccessibleFakeButton'), require('../Inks/injectInk'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.AccessibleFakeButton, global.injectInk);
    global.AccessibleFakeInkedButton = mod.exports;
  }
})(this, function (exports, _AccessibleFakeButton, _injectInk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _AccessibleFakeButton2 = _interopRequireDefault(_AccessibleFakeButton);

  var _injectInk2 = _interopRequireDefault(_injectInk);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _injectInk2.default)(_AccessibleFakeButton2.default);
});