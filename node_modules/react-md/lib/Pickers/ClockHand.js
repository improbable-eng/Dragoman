(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames);
    global.ClockHand = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

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

  var ClockHand = function (_PureComponent) {
    _inherits(ClockHand, _PureComponent);

    function ClockHand(props) {
      _classCallCheck(this, ClockHand);

      var _this = _possibleConstructorReturn(this, (ClockHand.__proto__ || Object.getPrototypeOf(ClockHand)).call(this, props));

      _this.state = { active: false };
      return _this;
    }

    _createClass(ClockHand, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if (this.props.minutes !== nextProps.minutes) {
          if (this.state.timeout) {
            clearTimeout(this.state.timeout);
          }

          this.setState({
            active: true,
            timeout: setTimeout(function () {
              return _this2.setState({ active: false, timeout: null });
            }, 150)
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.timeout) {
          clearTimeout(this.state.timeout);
        }
      }
    }, {
      key: '_calcCurrentDegrees',
      value: function _calcCurrentDegrees(_ref) {
        var time = _ref.time,
            minutes = _ref.minutes;

        var timeAt0Deg = minutes ? 15 : 3;
        var sectors = minutes ? 60 : 12;

        return (time % sectors - timeAt0Deg) * (360 / sectors);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            coords = _props.coords,
            time = _props.time,
            minutes = _props.minutes;


        var degrees = this._calcCurrentDegrees(this.props);
        var invisibleMinute = false;
        if (minutes) {
          invisibleMinute = degrees % (360 / 12) !== 0;
        }

        var rotateTransform = 'rotate3d(0, 0, 1, ' + degrees + 'deg)';
        return _react2.default.createElement('div', {
          className: (0, _classnames2.default)('md-clock-hand md-background--primary', {
            'md-clock-hand--active': this.state.active,
            'md-clock-hand--minute-hover': invisibleMinute,
            'md-clock-hand--inner': !minutes && (time > 12 || time === 0)
          }),
          style: {
            left: coords,
            top: coords,
            WebkitTransform: rotateTransform,
            MozTransform: rotateTransform,
            msTransform: rotateTransform,
            transform: rotateTransform
          }
        });
      }
    }]);

    return ClockHand;
  }(_react.PureComponent);

  ClockHand.propTypes = {
    /**
     * This is the x and y coordinate to use for the center of the `ClockFace`.
     * This should really be whatever the radius of the `ClockFace` is.
     */
    coords: _propTypes2.default.number,

    /**
     * The current time of the clock.
     */
    time: _propTypes2.default.number.isRequired,

    /**
     * Boolean if the clock is displaying minutes instead of hours.
     */
    minutes: _propTypes2.default.bool.isRequired
  };
  exports.default = ClockHand;
});