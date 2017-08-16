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
    global.Subheader = mod.exports;
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

  var Subheader = function (_PureComponent) {
    _inherits(Subheader, _PureComponent);

    function Subheader() {
      _classCallCheck(this, Subheader);

      return _possibleConstructorReturn(this, (Subheader.__proto__ || Object.getPrototypeOf(Subheader)).apply(this, arguments));
    }

    _createClass(Subheader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            Component = _props.component,
            inset = _props.inset,
            primary = _props.primary,
            primaryText = _props.primaryText,
            className = _props.className,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['component', 'inset', 'primary', 'primaryText', 'className', 'children']);

        return _react2.default.createElement(
          Component,
          _extends({}, props, {
            className: (0, _classnames2.default)('md-subheader', {
              'md-text--secondary': !primary,
              'md-text--theme-primary': primary,
              'md-list-item--inset': inset
            }, className)
          }),
          primaryText,
          children
        );
      }
    }]);

    return Subheader;
  }(_react.PureComponent);

  Subheader.propTypes = {
    /**
     * An optional style to apply to the subheader.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the subheader.
     */
    className: _propTypes2.default.string,

    /**
     * Boolean if the subheader should be styled with the primary color.
     */
    primary: _propTypes2.default.bool,

    /**
     * Boolean if the subheader is inset in the list. This will add additional
     * spacing to align the subheader.
     */
    inset: _propTypes2.default.bool,

    /**
     * The primary text to use in the subheader.
     */
    primaryText: _propTypes2.default.node.isRequired,

    /**
     * Any optional children to display after the `primaryText`. This prop is
     * unrecommended.
     */
    children: _propTypes2.default.node,

    /**
     * The component to render the Subheader as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired
  };
  Subheader.defaultProps = {
    component: 'li'
  };
  exports.default = Subheader;
});