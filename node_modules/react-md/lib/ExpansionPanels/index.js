(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './ExpansionPanel', './ExpansionList'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./ExpansionPanel'), require('./ExpansionList'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ExpansionPanel, global.ExpansionList);
    global.index = mod.exports;
  }
})(this, function (exports, _ExpansionPanel, _ExpansionList2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExpansionList = exports.ExpansionPanel = undefined;

  var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

  var _ExpansionList3 = _interopRequireDefault(_ExpansionList2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _ExpansionPanel2.default;
  exports.ExpansionPanel = _ExpansionPanel2.default;
  exports.ExpansionList = _ExpansionList3.default;
});