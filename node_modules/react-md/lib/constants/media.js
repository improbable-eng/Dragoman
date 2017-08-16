(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.media = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var MOBILE_MIN_WIDTH = exports.MOBILE_MIN_WIDTH = 320;
  var TABLET_MIN_WIDTH = exports.TABLET_MIN_WIDTH = 768;
  var DESKTOP_MIN_WIDTH = exports.DESKTOP_MIN_WIDTH = 1025;
});