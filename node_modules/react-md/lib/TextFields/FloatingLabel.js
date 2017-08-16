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
    global.FloatingLabel = mod.exports;
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  var FloatingLabel = function (_PureComponent) {
    _inherits(FloatingLabel, _PureComponent);

    function FloatingLabel() {
      _classCallCheck(this, FloatingLabel);

      return _possibleConstructorReturn(this, (FloatingLabel.__proto__ || Object.getPrototypeOf(FloatingLabel)).apply(this, arguments));
    }

    _createClass(FloatingLabel, [{
      key: 'render',
      value: function render() {
        var _cn;

        var _props = this.props,
            label = _props.label,
            htmlFor = _props.htmlFor,
            className = _props.className,
            floating = _props.floating,
            active = _props.active,
            error = _props.error,
            disabled = _props.disabled,
            iconOffset = _props.iconOffset,
            customSize = _props.customSize,
            props = _objectWithoutProperties(_props, ['label', 'htmlFor', 'className', 'floating', 'active', 'error', 'disabled', 'iconOffset', 'customSize']);

        if (!label) {
          return null;
        }

        return _react2.default.createElement(
          'label',
          _extends({}, props, {
            htmlFor: htmlFor,
            className: (0, _classnames2.default)('md-floating-label', (_cn = {
              'md-floating-label--active': !error && active,
              'md-floating-label--error': !disabled && error,
              'md-floating-label--inactive': !floating,
              'md-floating-label--inactive-sized': !floating && !customSize
            }, _defineProperty(_cn, 'md-floating-label--' + customSize, customSize), _defineProperty(_cn, 'md-floating-label--inactive-' + customSize, customSize && !floating), _defineProperty(_cn, 'md-floating-label--floating', floating), _defineProperty(_cn, 'md-floating-label--disabled', disabled), _defineProperty(_cn, 'md-floating-label--icon-offset', iconOffset), _cn), className)
          }),
          label
        );
      }
    }]);

    return FloatingLabel;
  }(_react.PureComponent);

  FloatingLabel.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    label: _propTypes2.default.node,
    floating: _propTypes2.default.bool,
    error: _propTypes2.default.bool,
    active: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    iconOffset: _propTypes2.default.bool,
    customSize: _propTypes2.default.string,
    htmlFor: _propTypes2.default.string
  };
  exports.default = FloatingLabel;
});