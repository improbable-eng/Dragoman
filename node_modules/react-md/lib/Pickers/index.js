(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DatePickerContainer', './TimePickerContainer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DatePickerContainer'), require('./TimePickerContainer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DatePickerContainer, global.TimePickerContainer);
    global.index = mod.exports;
  }
})(this, function (exports, _DatePickerContainer, _TimePickerContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TimePicker = exports.DatePicker = undefined;

  var _DatePickerContainer2 = _interopRequireDefault(_DatePickerContainer);

  var _TimePickerContainer2 = _interopRequireDefault(_TimePickerContainer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.DatePicker = _DatePickerContainer2.default;
  exports.TimePicker = _TimePickerContainer2.default;
});