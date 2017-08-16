(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DrawerTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DrawerTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DrawerTypes);
    global.isType = mod.exports;
  }
})(this, function (exports, _DrawerTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isTemporary = isTemporary;
  exports.isPersistent = isPersistent;
  exports.isPermanent = isPermanent;
  exports.isMini = isMini;

  var _DrawerTypes2 = _interopRequireDefault(_DrawerTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FULL_HEIGHT = _DrawerTypes2.default.FULL_HEIGHT,
      CLIPPED = _DrawerTypes2.default.CLIPPED,
      FLOATING = _DrawerTypes2.default.FLOATING,
      PERSISTENT = _DrawerTypes2.default.PERSISTENT,
      PERSISTENT_MINI = _DrawerTypes2.default.PERSISTENT_MINI,
      TEMPORARY = _DrawerTypes2.default.TEMPORARY,
      TEMPORARY_MINI = _DrawerTypes2.default.TEMPORARY_MINI;
  function isTemporary(type) {
    return [TEMPORARY, TEMPORARY_MINI].indexOf(type) !== -1;
  }

  function isPersistent(type) {
    return [PERSISTENT, PERSISTENT_MINI].indexOf(type) !== -1;
  }

  function isPermanent(type) {
    return [FULL_HEIGHT, CLIPPED, FLOATING].indexOf(type) !== -1;
  }

  function isMini(type) {
    return [PERSISTENT_MINI, TEMPORARY_MINI].indexOf(type) !== -1;
  }
});