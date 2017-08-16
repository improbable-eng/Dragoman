(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './CalendarMonth', './CalendarHeader'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./CalendarMonth'), require('./CalendarHeader'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.CalendarMonth, global.CalendarHeader);
    global.DatePickerCalendar = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _CalendarMonth, _CalendarHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

  var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DatePickerCalendar = function (_PureComponent) {
    _inherits(DatePickerCalendar, _PureComponent);

    function DatePickerCalendar() {
      _classCallCheck(this, DatePickerCalendar);

      return _possibleConstructorReturn(this, (DatePickerCalendar.__proto__ || Object.getPrototypeOf(DatePickerCalendar)).apply(this, arguments));
    }

    _createClass(DatePickerCalendar, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            previousIconChildren = _props.previousIconChildren,
            previousIconClassName = _props.previousIconClassName,
            onPreviousClick = _props.onPreviousClick,
            nextIconChildren = _props.nextIconChildren,
            nextIconClassName = _props.nextIconClassName,
            onNextClick = _props.onNextClick,
            calendarDate = _props.calendarDate,
            calendarTempDate = _props.calendarTempDate,
            onCalendarDateClick = _props.onCalendarDateClick,
            DateTimeFormat = _props.DateTimeFormat,
            locales = _props.locales,
            minDate = _props.minDate,
            maxDate = _props.maxDate;


        return _react2.default.createElement(
          'section',
          { className: 'md-picker-content md-picker-content--calendar' },
          _react2.default.createElement(_CalendarHeader2.default, {
            date: calendarDate,
            minDate: minDate,
            maxDate: maxDate,
            DateTimeFormat: DateTimeFormat,
            locales: locales,
            onPreviousClick: onPreviousClick,
            previousIconChildren: previousIconChildren,
            previousIconClassName: previousIconClassName,
            onNextClick: onNextClick,
            nextIconChildren: nextIconChildren,
            nextIconClassName: nextIconClassName
          }),
          _react2.default.createElement(_CalendarMonth2.default, {
            key: new DateTimeFormat(locales).format(calendarDate),
            calendarDate: calendarDate,
            calendarTempDate: calendarTempDate,
            onCalendarDateClick: onCalendarDateClick,
            minDate: minDate,
            maxDate: maxDate,
            DateTimeFormat: DateTimeFormat,
            locales: locales
          })
        );
      }
    }]);

    return DatePickerCalendar;
  }(_react.PureComponent);

  DatePickerCalendar.propTypes = {
    previousIconChildren: _propTypes2.default.node,
    previousIconClassName: _propTypes2.default.string,
    onPreviousClick: _propTypes2.default.func.isRequired,
    nextIconChildren: _propTypes2.default.node,
    nextIconClassName: _propTypes2.default.string,
    onNextClick: _propTypes2.default.func.isRequired,
    onCalendarDateClick: _propTypes2.default.func.isRequired,
    calendarDate: _propTypes2.default.instanceOf(Date).isRequired,
    calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,
    DateTimeFormat: _propTypes2.default.func.isRequired,
    locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
    minDate: _propTypes2.default.instanceOf(Date),
    maxDate: _propTypes2.default.instanceOf(Date)
  };
  exports.default = DatePickerCalendar;
});