(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DrawerTypes', './isType'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DrawerTypes'), require('./isType'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DrawerTypes, global.isType);
    global.resolveMobileDrawerType = mod.exports;
  }
})(this, function (exports, _DrawerTypes, _isType) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = resolveMobileDrawerType;

  var _DrawerTypes2 = _interopRequireDefault(_DrawerTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function resolveMobileDrawerType(type, mobile) {
    if (!mobile && !((0, _isType.isPermanent)(type) && (0, _isType.isPersistent)(type))) {
      return type;
    } else if ((0, _isType.isPermanent)(type) || _DrawerTypes2.default.PERSISTENT === type) {
      return _DrawerTypes2.default.TEMPORARY;
    }

    return _DrawerTypes2.default.TEMPORARY_MINI;
  }
});