(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Button', './FlatButton', './RaisedButton', './FloatingButton', './IconButton'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Button'), require('./FlatButton'), require('./RaisedButton'), require('./FloatingButton'), require('./IconButton'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Button, global.FlatButton, global.RaisedButton, global.FloatingButton, global.IconButton);
    global.index = mod.exports;
  }
})(this, function (exports, _Button2, _FlatButton2, _RaisedButton2, _FloatingButton2, _IconButton2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IconButton = exports.FloatingButton = exports.RaisedButton = exports.FlatButton = exports.Button = undefined;

  var _Button3 = _interopRequireDefault(_Button2);

  var _FlatButton3 = _interopRequireDefault(_FlatButton2);

  var _RaisedButton3 = _interopRequireDefault(_RaisedButton2);

  var _FloatingButton3 = _interopRequireDefault(_FloatingButton2);

  var _IconButton3 = _interopRequireDefault(_IconButton2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Button3.default;
  exports.Button = _Button3.default;
  exports.FlatButton = _FlatButton3.default;
  exports.RaisedButton = _RaisedButton3.default;
  exports.FloatingButton = _FloatingButton3.default;
  exports.IconButton = _IconButton3.default;
});