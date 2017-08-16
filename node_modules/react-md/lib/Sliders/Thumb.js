(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../Helpers/AccessibleFakeButton'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../Helpers/AccessibleFakeButton'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.AccessibleFakeButton);
    global.Thumb = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _AccessibleFakeButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _AccessibleFakeButton2 = _interopRequireDefault(_AccessibleFakeButton);

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

  var Thumb = function (_PureComponent) {
    _inherits(Thumb, _PureComponent);

    function Thumb() {
      _classCallCheck(this, Thumb);

      return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).apply(this, arguments));
    }

    _createClass(Thumb, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            style = _props.style,
            className = _props.className,
            on = _props.on,
            off = _props.off,
            active = _props.active,
            disabled = _props.disabled,
            dragging = _props.dragging,
            thumbLeft = _props.thumbLeft,
            discrete = _props.discrete,
            props = _objectWithoutProperties(_props, ['style', 'className', 'on', 'off', 'active', 'disabled', 'dragging', 'thumbLeft', 'discrete']);

        return _react2.default.createElement(_AccessibleFakeButton2.default, _extends({
          disabled: disabled
        }, props, {
          style: Object.assign({}, style, { left: thumbLeft }),
          className: (0, _classnames2.default)('md-slider-thumb', className, {
            'md-slider-thumb--active': active,
            'md-slider-thumb--dragging': dragging,
            'md-slider-thumb--disabled': disabled,
            'md-slider-thumb--on': on,
            'md-slider-thumb--continuous-off': !discrete && off,
            'md-slider-thumb--discrete': discrete,
            'md-slider-thumb--discrete-on': discrete && active && on,
            'md-slider-thumb--discrete-off': discrete && !disabled && off,
            'md-slider-thumb--discrete-active': discrete && active,
            'md-slider-thumb--discrete-active-off': discrete && active && off
          })
        }));
      }
    }]);

    return Thumb;
  }(_react.PureComponent);

  Thumb.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    thumbLeft: _propTypes2.default.string.isRequired,
    on: _propTypes2.default.bool,
    off: _propTypes2.default.bool,
    active: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    dragging: _propTypes2.default.bool,
    discrete: _propTypes2.default.bool
  };
  exports.default = Thumb;
});