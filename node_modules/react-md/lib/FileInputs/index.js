(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './FileInput', './FileUpload'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./FileInput'), require('./FileUpload'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.FileInput, global.FileUpload);
    global.index = mod.exports;
  }
})(this, function (exports, _FileInput, _FileUpload2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FileUpload = exports.FileInput = undefined;

  var _FileInput2 = _interopRequireDefault(_FileInput);

  var _FileUpload3 = _interopRequireDefault(_FileUpload2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _FileInput2.default;
  exports.FileInput = _FileInput2.default;
  exports.FileUpload = _FileUpload3.default;
});