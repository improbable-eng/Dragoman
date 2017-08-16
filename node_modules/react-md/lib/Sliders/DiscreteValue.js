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
    global.DiscreteValue = mod.exports;
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

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  var DiscreteValue = function (_PureComponent) {
    _inherits(DiscreteValue, _PureComponent);

    function DiscreteValue() {
      _classCallCheck(this, DiscreteValue);

      return _possibleConstructorReturn(this, (DiscreteValue.__proto__ || Object.getPrototypeOf(DiscreteValue)).apply(this, arguments));
    }

    _createClass(DiscreteValue, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            style = _props.style,
            className = _props.className,
            discrete = _props.discrete,
            dragging = _props.dragging,
            thumbLeft = _props.thumbLeft,
            active = _props.active,
            value = _props.value,
            valuePrecision = _props.valuePrecision,
            props = _objectWithoutProperties(_props, ['style', 'className', 'discrete', 'dragging', 'thumbLeft', 'active', 'value', 'valuePrecision']);

        if (!discrete || !active) {
          return null;
        }

        var valueStr = value.toFixed(valuePrecision);
        if (valuePrecision > 0) {
          var _valueStr$split = valueStr.split('.'),
              _valueStr$split2 = _slicedToArray(_valueStr$split, 2),
              w = _valueStr$split2[0],
              d = _valueStr$split2[1];

          if (parseInt(d, 10) === 0) {
            valueStr = w;
          }
        }
        return _react2.default.createElement(
          'span',
          _extends({}, props, {
            style: Object.assign({}, style, { left: thumbLeft }),
            className: (0, _classnames2.default)('md-slider-discrete-value', className, {
              'md-slider-discrete-value--dragging': dragging
            })
          }),
          valueStr
        );
      }
    }]);

    return DiscreteValue;
  }(_react.PureComponent);

  DiscreteValue.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    discrete: _propTypes2.default.bool,
    dragging: _propTypes2.default.bool,
    active: _propTypes2.default.bool,
    value: _propTypes2.default.number.isRequired,
    thumbLeft: _propTypes2.default.string.isRequired,
    valuePrecision: _propTypes2.default.number.isRequired
  };
  exports.default = DiscreteValue;
});