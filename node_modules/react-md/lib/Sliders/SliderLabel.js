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
    global.SliderLabel = mod.exports;
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

  var SliderLabel = function (_PureComponent) {
    _inherits(SliderLabel, _PureComponent);

    function SliderLabel() {
      _classCallCheck(this, SliderLabel);

      return _possibleConstructorReturn(this, (SliderLabel.__proto__ || Object.getPrototypeOf(SliderLabel)).apply(this, arguments));
    }

    _createClass(SliderLabel, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            htmlFor = _props.htmlFor,
            props = _objectWithoutProperties(_props, ['children', 'className', 'htmlFor']);

        if (!children) {
          return null;
        }

        return _react2.default.createElement(
          'label',
          _extends({}, props, {
            htmlFor: htmlFor,
            className: (0, _classnames2.default)('md-slider-label md-text', className)
          }),
          children
        );
      }
    }]);

    return SliderLabel;
  }(_react.PureComponent);

  SliderLabel.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    htmlFor: function htmlFor(props, propName, component) {
      for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        others[_key - 3] = arguments[_key];
      }

      var _PropTypes$string;

      if (typeof props.children === 'undefined') {
        return null;
      }

      return (_PropTypes$string = _propTypes2.default.string).isRequired.apply(_PropTypes$string, [props, propName, component].concat(others));
    }
  };
  exports.default = SliderLabel;
});