(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../utils/DateUtils/isMonthBefore', '../utils/DateUtils/getDayOfWeek', '../utils/DateUtils/addDate', '../Buttons/Button'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../utils/DateUtils/isMonthBefore'), require('../utils/DateUtils/getDayOfWeek'), require('../utils/DateUtils/addDate'), require('../Buttons/Button'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.isMonthBefore, global.getDayOfWeek, global.addDate, global.Button);
    global.CalendarHeader = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _isMonthBefore, _getDayOfWeek, _addDate, _Button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _isMonthBefore2 = _interopRequireDefault(_isMonthBefore);

  var _getDayOfWeek2 = _interopRequireDefault(_getDayOfWeek);

  var _addDate2 = _interopRequireDefault(_addDate);

  var _Button2 = _interopRequireDefault(_Button);

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

  var CalendarHeader = function (_PureComponent) {
    _inherits(CalendarHeader, _PureComponent);

    function CalendarHeader(props) {
      _classCallCheck(this, CalendarHeader);

      var _this = _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).call(this, props));

      _this.state = _this._createState(props);
      return _this;
    }

    _createClass(CalendarHeader, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _props = this.props,
            DateTimeFormat = _props.DateTimeFormat,
            locales = _props.locales,
            date = _props.date;

        if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
          this.setState(this._createState(nextProps));
        }
      }
    }, {
      key: '_createState',
      value: function _createState() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
            DateTimeFormat = _ref.DateTimeFormat,
            locales = _ref.locales,
            date = _ref.date;

        var sunday = (0, _getDayOfWeek2.default)(date, 0);
        var formatter = new DateTimeFormat(locales, { weekday: 'narrow' });
        var dows = [];
        for (var i = 0; i < 7; i++) {
          var dow = formatter.format((0, _addDate2.default)(sunday, i, 'D'));
          dows.push(_react2.default.createElement(
            'h4',
            { className: 'md-calendar-date md-text--disabled md-calendar-dow', key: i },
            dow
          ));
        }

        return {
          dows: dows,
          title: new DateTimeFormat(locales, { month: 'long', year: 'numeric' }).format(date)
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            dows = _state.dows,
            title = _state.title;
        var _props2 = this.props,
            date = _props2.date,
            minDate = _props2.minDate,
            maxDate = _props2.maxDate,
            onPreviousClick = _props2.onPreviousClick,
            previousIconChildren = _props2.previousIconChildren,
            previousIconClassName = _props2.previousIconClassName,
            onNextClick = _props2.onNextClick,
            nextIconChildren = _props2.nextIconChildren,
            nextIconClassName = _props2.nextIconClassName;


        var isPreviousDisabled = (0, _isMonthBefore2.default)(minDate, date);
        var isNextDisabled = (0, _isMonthBefore2.default)(date, maxDate);
        return _react2.default.createElement(
          'header',
          { className: 'md-calendar-header' },
          _react2.default.createElement(
            'div',
            { className: 'md-calendar-controls' },
            _react2.default.createElement(
              _Button2.default,
              {
                icon: true,
                onClick: onPreviousClick,
                disabled: isPreviousDisabled,
                className: 'md-calendar-control',
                iconClassName: previousIconClassName
              },
              previousIconChildren
            ),
            _react2.default.createElement(
              'h4',
              { className: 'md-title' },
              title
            ),
            _react2.default.createElement(
              _Button2.default,
              {
                icon: true,
                onClick: onNextClick,
                disabled: isNextDisabled,
                className: 'md-calendar-control',
                iconClassName: nextIconClassName
              },
              nextIconChildren
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'md-calendar-dows' },
            dows
          )
        );
      }
    }]);

    return CalendarHeader;
  }(_react.PureComponent);

  CalendarHeader.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    date: _propTypes2.default.instanceOf(Date).isRequired,
    minDate: _propTypes2.default.instanceOf(Date),
    maxDate: _propTypes2.default.instanceOf(Date),
    previousIconChildren: _propTypes2.default.node,
    previousIconClassName: _propTypes2.default.string,
    onPreviousClick: _propTypes2.default.func.isRequired,
    nextIconChildren: _propTypes2.default.node,
    nextIconClassName: _propTypes2.default.string,
    onNextClick: _propTypes2.default.func.isRequired,
    DateTimeFormat: _propTypes2.default.func.isRequired,
    locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired
  };
  exports.default = CalendarHeader;
});