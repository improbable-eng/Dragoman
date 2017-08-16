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
    global.TrackFill = mod.exports;
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

  var TrackFill = function (_PureComponent) {
    _inherits(TrackFill, _PureComponent);

    function TrackFill() {
      _classCallCheck(this, TrackFill);

      return _possibleConstructorReturn(this, (TrackFill.__proto__ || Object.getPrototypeOf(TrackFill)).apply(this, arguments));
    }

    _createClass(TrackFill, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            style = _props.style,
            className = _props.className,
            trackFillWidth = _props.trackFillWidth,
            dragging = _props.dragging,
            disabled = _props.disabled,
            props = _objectWithoutProperties(_props, ['style', 'className', 'trackFillWidth', 'dragging', 'disabled']);

        if (disabled) {
          return null;
        }

        return _react2.default.createElement('hr', _extends({}, props, {
          style: Object.assign({}, style, { width: trackFillWidth }),
          className: (0, _classnames2.default)('md-slider-track-fill', className, {
            'md-slider-track-fill--dragging': dragging
          })
        }));
      }
    }]);

    return TrackFill;
  }(_react.PureComponent);

  TrackFill.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    dragging: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    trackFillWidth: _propTypes2.default.string.isRequired
  };
  exports.default = TrackFill;
});