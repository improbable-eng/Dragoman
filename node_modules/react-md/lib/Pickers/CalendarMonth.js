(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../utils/DateUtils/addDate', '../utils/DateUtils/stripTime', '../utils/DateUtils/getLastDay', '../utils/DateUtils/getDayOfWeek', './CalendarDate'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../utils/DateUtils/addDate'), require('../utils/DateUtils/stripTime'), require('../utils/DateUtils/getLastDay'), require('../utils/DateUtils/getDayOfWeek'), require('./CalendarDate'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.addDate, global.stripTime, global.getLastDay, global.getDayOfWeek, global.CalendarDate);
    global.CalendarMonth = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _addDate, _stripTime, _getLastDay, _getDayOfWeek, _CalendarDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _addDate2 = _interopRequireDefault(_addDate);

  var _stripTime2 = _interopRequireDefault(_stripTime);

  var _getLastDay2 = _interopRequireDefault(_getLastDay);

  var _getDayOfWeek2 = _interopRequireDefault(_getDayOfWeek);

  var _CalendarDate2 = _interopRequireDefault(_CalendarDate);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
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

  var CalendarMonth = function (_PureComponent) {
    _inherits(CalendarMonth, _PureComponent);

    function CalendarMonth() {
      _classCallCheck(this, CalendarMonth);

      return _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).apply(this, arguments));
    }

    _createClass(CalendarMonth, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            calendarDate = _props.calendarDate,
            calendarTempDate = _props.calendarTempDate,
            onCalendarDateClick = _props.onCalendarDateClick,
            minDate = _props.minDate,
            maxDate = _props.maxDate,
            DateTimeFormat = _props.DateTimeFormat,
            locales = _props.locales,
            className = _props.className,
            props = _objectWithoutProperties(_props, ['calendarDate', 'calendarTempDate', 'onCalendarDateClick', 'minDate', 'maxDate', 'DateTimeFormat', 'locales', 'className']);

        var days = [];
        var currentDate = (0, _stripTime2.default)((0, _getDayOfWeek2.default)(new Date(calendarDate).setDate(1), 0));
        var endDate = (0, _stripTime2.default)((0, _getDayOfWeek2.default)((0, _getLastDay2.default)(calendarDate), 6));
        var activeDate = (0, _stripTime2.default)(new Date(calendarTempDate));
        var today = (0, _stripTime2.default)(new Date());

        while (currentDate <= endDate) {
          var key = currentDate.getMonth() + '-' + currentDate.getDate();

          var date = void 0;
          if (currentDate.getMonth() === calendarDate.getMonth()) {
            var time = currentDate.getTime();
            var isMinDateDisabled = minDate && minDate.getTime() > time;
            var isMaxDateDisbaled = maxDate && maxDate.getTime() < time;
            date = _react2.default.createElement(_CalendarDate2.default, {
              key: key,
              today: time === today.getTime(),
              active: time === activeDate.getTime(),
              disabled: isMinDateDisabled || isMaxDateDisbaled,
              onClick: onCalendarDateClick,
              date: currentDate,
              DateTimeFormat: DateTimeFormat,
              locales: locales
            });
          } else {
            date = _react2.default.createElement('div', { key: key, className: 'md-calendar-date' });
          }

          days.push(date);
          currentDate = (0, _addDate2.default)(currentDate, 1, 'D');
        }

        return _react2.default.createElement(
          'div',
          _extends({ className: (0, _classnames2.default)('md-calendar-month', className) }, props),
          days
        );
      }
    }]);

    return CalendarMonth;
  }(_react.PureComponent);

  CalendarMonth.propTypes = {
    /**
     * A className to apply.
     */
    className: _propTypes2.default.string,

    /**
     * The current selected date of the calendar. This is
     * the date after hitting the Ok button or `value` || `defaultValue`.
     */
    calendarDate: _propTypes2.default.instanceOf(Date).isRequired,

    /**
     * The current selected date of the calendar before verifying
     * the new date.
     */
    calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,

    /**
     * An optional min date for the calendar. This will disable any
     * dates that come before this date in the month.
     */
    minDate: _propTypes2.default.instanceOf(Date),

    /**
     * An optional max date for the calendar. This will disable any
     * dates that come after this date in the month.
     */
    maxDate: _propTypes2.default.instanceOf(Date),

    /**
     * A function to call that will select a new date.
     */
    onCalendarDateClick: _propTypes2.default.func.isRequired,
    DateTimeFormat: _propTypes2.default.func.isRequired,
    locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired
  };
  exports.default = CalendarMonth;
});