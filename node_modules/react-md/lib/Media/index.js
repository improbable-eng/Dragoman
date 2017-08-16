(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Media', './MediaOverlay'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Media'), require('./MediaOverlay'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Media, global.MediaOverlay);
    global.index = mod.exports;
  }
})(this, function (exports, _Media, _MediaOverlay2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MediaOverlay = exports.Media = undefined;

  var _Media2 = _interopRequireDefault(_Media);

  var _MediaOverlay3 = _interopRequireDefault(_MediaOverlay2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Media2.default;
  exports.Media = _Media2.default;
  exports.MediaOverlay = _MediaOverlay3.default;
});