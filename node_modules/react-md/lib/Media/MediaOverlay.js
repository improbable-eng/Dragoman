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
    global.MediaOverlay = mod.exports;
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

  var MediaOverlay = function (_PureComponent) {
    _inherits(MediaOverlay, _PureComponent);

    function MediaOverlay() {
      _classCallCheck(this, MediaOverlay);

      return _possibleConstructorReturn(this, (MediaOverlay.__proto__ || Object.getPrototypeOf(MediaOverlay)).apply(this, arguments));
    }

    _createClass(MediaOverlay, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            Component = _props.component,
            props = _objectWithoutProperties(_props, ['className', 'component']);

        return _react2.default.createElement(Component, _extends({ className: (0, _classnames2.default)('md-media-overlay', className) }, props));
      }
    }]);

    return MediaOverlay;
  }(_react.PureComponent);

  MediaOverlay.propTypes = {
    /**
     * An optional style to apply to the overlay.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the overlay.
     */
    className: _propTypes2.default.string,

    /**
     * Any children to display in the overlay. This is _normally_ a `CardTitle` component
     * or some buttons.
     */
    children: _propTypes2.default.node,

    /**
     * The component to be rendered as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired
  };
  MediaOverlay.defaultProps = {
    component: 'div'
  };
  exports.default = MediaOverlay;
});