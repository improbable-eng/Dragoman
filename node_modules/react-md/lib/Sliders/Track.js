(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../utils/NumberUtils/updateUnit', './TrackFill', './Thumb', './ThumbMask', './DiscreteValue'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../utils/NumberUtils/updateUnit'), require('./TrackFill'), require('./Thumb'), require('./ThumbMask'), require('./DiscreteValue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.updateUnit, global.TrackFill, global.Thumb, global.ThumbMask, global.DiscreteValue);
    global.Track = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _updateUnit, _TrackFill, _Thumb, _ThumbMask, _DiscreteValue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _updateUnit2 = _interopRequireDefault(_updateUnit);

  var _TrackFill2 = _interopRequireDefault(_TrackFill);

  var _Thumb2 = _interopRequireDefault(_Thumb);

  var _ThumbMask2 = _interopRequireDefault(_ThumbMask);

  var _DiscreteValue2 = _interopRequireDefault(_DiscreteValue);

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

  var half = function half(w) {
    return w / 2;
  };

  /**
   * The `Track` component is used for showing the current state of the slider.
   * It will render the `TrackFill`, `Thumb`, and `ThumbMask` components.
   */

  var Track = function (_PureComponent) {
    _inherits(Track, _PureComponent);

    function Track() {
      _classCallCheck(this, Track);

      return _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).apply(this, arguments));
    }

    _createClass(Track, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            on = _props.on,
            off = _props.off,
            active = _props.active,
            disabled = _props.disabled,
            dragging = _props.dragging,
            className = _props.className,
            thumbLeft = _props.thumbLeft,
            trackFillWidth = _props.trackFillWidth,
            trackFillStyle = _props.trackFillStyle,
            trackFillClassName = _props.trackFillClassName,
            discreteValueStyle = _props.discreteValueStyle,
            discreteValueClassName = _props.discreteValueClassName,
            maskInked = _props.maskInked,
            maskLeaving = _props.maskLeaving,
            thumbStyle = _props.thumbStyle,
            thumbClassName = _props.thumbClassName,
            discrete = _props.discrete,
            onThumbFocus = _props.onThumbFocus,
            onThumbKeyUp = _props.onThumbKeyUp,
            onThumbKeyDown = _props.onThumbKeyDown,
            value = _props.value,
            tickWidth = _props.tickWidth,
            discreteTicks = _props.discreteTicks,
            scale = _props.scale,
            step = _props.step,
            valuePrecision = _props.valuePrecision,
            props = _objectWithoutProperties(_props, ['on', 'off', 'active', 'disabled', 'dragging', 'className', 'thumbLeft', 'trackFillWidth', 'trackFillStyle', 'trackFillClassName', 'discreteValueStyle', 'discreteValueClassName', 'maskInked', 'maskLeaving', 'thumbStyle', 'thumbClassName', 'discrete', 'onThumbFocus', 'onThumbKeyUp', 'onThumbKeyDown', 'value', 'tickWidth', 'discreteTicks', 'scale', 'step', 'valuePrecision']);

        var ticks = [];
        if (typeof discreteTicks !== 'undefined' && !disabled && discrete) {
          var amt = scale / (discreteTicks / step);
          var offset = (0, _updateUnit2.default)(tickWidth, half, 'px');
          var inc = 100 / amt;

          for (var i = 0; i <= amt; i++) {
            var left = i * inc + '%';
            var width = tickWidth;
            if (i === 0 || i === amt) {
              width = (0, _updateUnit2.default)(tickWidth, half);
            } else {
              left = 'calc(' + left + ' - ' + offset + ')';
            }

            ticks.push(_react2.default.createElement('span', {
              key: 'tick-' + i,
              className: 'md-slider-discrete-tick',
              style: { left: left, width: width }
            }));
          }
        }

        return _react2.default.createElement(
          'div',
          _extends({}, props, { className: (0, _classnames2.default)('md-slider-track', className) }),
          ticks,
          _react2.default.createElement(_TrackFill2.default, {
            style: trackFillStyle,
            className: trackFillClassName,
            disabled: disabled,
            dragging: dragging,
            trackFillWidth: trackFillWidth
          }),
          _react2.default.createElement(_Thumb2.default, {
            style: thumbStyle,
            className: thumbClassName,
            on: on,
            off: off,
            disabled: disabled,
            dragging: dragging,
            active: active,
            thumbLeft: thumbLeft,
            onFocus: onThumbFocus,
            onKeyUp: onThumbKeyUp,
            onKeyDown: onThumbKeyDown,
            discrete: discrete
          }),
          _react2.default.createElement(_DiscreteValue2.default, {
            style: discreteValueStyle,
            className: discreteValueClassName,
            discrete: discrete,
            dragging: dragging,
            active: active,
            value: value,
            thumbLeft: thumbLeft,
            valuePrecision: valuePrecision
          }),
          _react2.default.createElement(_ThumbMask2.default, {
            dragging: dragging,
            disabled: disabled,
            thumbLeft: thumbLeft,
            maskInked: maskInked,
            discrete: discrete,
            leaving: maskLeaving
          })
        );
      }
    }]);

    return Track;
  }(_react.PureComponent);

  Track.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    thumbStyle: _propTypes2.default.object,
    thumbClassName: _propTypes2.default.string,
    trackFillStyle: _propTypes2.default.object,
    trackFillClassName: _propTypes2.default.string,
    discreteValueStyle: _propTypes2.default.object,
    discreteValueClassName: _propTypes2.default.string,
    on: _propTypes2.default.bool,
    off: _propTypes2.default.bool,
    active: _propTypes2.default.bool,
    dragging: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    thumbLeft: _propTypes2.default.string.isRequired,
    trackFillWidth: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.number.isRequired,
    discrete: _propTypes2.default.bool,
    maskInked: _propTypes2.default.bool,
    maskLeaving: _propTypes2.default.bool,
    onThumbKeyUp: _propTypes2.default.func.isRequired,
    onThumbKeyDown: _propTypes2.default.func.isRequired,
    onThumbFocus: _propTypes2.default.func.isRequired,
    scale: _propTypes2.default.number,
    step: _propTypes2.default.number,
    discreteTicks: _propTypes2.default.number,
    tickWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    valuePrecision: _propTypes2.default.number.isRequired
  };
  exports.default = Track;
});