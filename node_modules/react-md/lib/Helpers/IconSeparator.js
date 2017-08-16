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
    global.IconSeparator = mod.exports;
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

  var IconSeparator = function (_PureComponent) {
    _inherits(IconSeparator, _PureComponent);

    function IconSeparator() {
      _classCallCheck(this, IconSeparator);

      return _possibleConstructorReturn(this, (IconSeparator.__proto__ || Object.getPrototypeOf(IconSeparator)).apply(this, arguments));
    }

    _createClass(IconSeparator, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            labelStyle = _props.labelStyle,
            labelClassName = _props.labelClassName,
            component = _props.component,
            label = _props.label,
            iconBefore = _props.iconBefore,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['className', 'labelStyle', 'labelClassName', 'component', 'label', 'iconBefore', 'children']);

        var text = void 0;
        if ((0, _react.isValidElement)(label)) {
          var labelProps = _react.Children.only(label).props;
          text = (0, _react.cloneElement)(label, {
            className: (0, _classnames2.default)('md-icon-text', labelClassName, labelProps.className),
            style: _extends({}, labelStyle, labelProps.style)
          });
        } else {
          text = _react2.default.createElement(
            'span',
            { style: labelStyle, className: (0, _classnames2.default)('md-icon-text', labelClassName) },
            label
          );
        }

        var Component = component;

        return _react2.default.createElement(
          Component,
          _extends({}, props, { className: (0, _classnames2.default)('md-icon-separator', className) }),
          iconBefore && children,
          text,
          !iconBefore && children
        );
      }
    }]);

    return IconSeparator;
  }(_react.PureComponent);

  IconSeparator.propTypes = {
    /**
     * An optional style to apply.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply.
     */
    className: _propTypes2.default.string,

    /**
     * An optional style to apply to the label.
     */
    labelStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to the label.
     */
    labelClassName: _propTypes2.default.string,

    /**
     * The label to display.
     */
    label: _propTypes2.default.node.isRequired,

    /**
     * The icon to display.
     */
    children: _propTypes2.default.node.isRequired,

    /**
     * Boolean if the icon should appear before or after the text
     */
    iconBefore: _propTypes2.default.bool,

    /**
     * The component to be rendered as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired
  };
  IconSeparator.defaultProps = {
    component: 'div'
  };
  exports.default = IconSeparator;
});