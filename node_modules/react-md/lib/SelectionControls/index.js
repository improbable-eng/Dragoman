(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SelectionControl', './SelectionControlGroup', './Checkbox', './Radio', './RadioGroup', './Switch'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SelectionControl'), require('./SelectionControlGroup'), require('./Checkbox'), require('./Radio'), require('./RadioGroup'), require('./Switch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SelectionControl, global.SelectionControlGroup, global.Checkbox, global.Radio, global.RadioGroup, global.Switch);
    global.index = mod.exports;
  }
})(this, function (exports, _SelectionControl, _SelectionControlGroup2, _Checkbox2, _Radio2, _RadioGroup2, _Switch2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Switch = exports.RadioGroup = exports.Radio = exports.Checkbox = exports.SelectionControlGroup = exports.SelectionControl = undefined;

  var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

  var _SelectionControlGroup3 = _interopRequireDefault(_SelectionControlGroup2);

  var _Checkbox3 = _interopRequireDefault(_Checkbox2);

  var _Radio3 = _interopRequireDefault(_Radio2);

  var _RadioGroup3 = _interopRequireDefault(_RadioGroup2);

  var _Switch3 = _interopRequireDefault(_Switch2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _SelectionControl2.default;
  exports.SelectionControl = _SelectionControl2.default;
  exports.SelectionControlGroup = _SelectionControlGroup3.default;
  exports.Checkbox = _Checkbox3.default;
  exports.Radio = _Radio3.default;
  exports.RadioGroup = _RadioGroup3.default;
  exports.Switch = _Switch3.default;
});