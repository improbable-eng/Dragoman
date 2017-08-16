(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './NavigationDrawer', './CloseButton', './JumpToContentLink'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./NavigationDrawer'), require('./CloseButton'), require('./JumpToContentLink'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.NavigationDrawer, global.CloseButton, global.JumpToContentLink);
    global.index = mod.exports;
  }
})(this, function (exports, _NavigationDrawer, _CloseButton2, _JumpToContentLink2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.JumpToContentLink = exports.CloseButton = exports.NavigationDrawer = undefined;

  var _NavigationDrawer2 = _interopRequireDefault(_NavigationDrawer);

  var _CloseButton3 = _interopRequireDefault(_CloseButton2);

  var _JumpToContentLink3 = _interopRequireDefault(_JumpToContentLink2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _NavigationDrawer2.default;
  exports.NavigationDrawer = _NavigationDrawer2.default;
  exports.CloseButton = _CloseButton3.default;
  exports.JumpToContentLink = _JumpToContentLink3.default;
});