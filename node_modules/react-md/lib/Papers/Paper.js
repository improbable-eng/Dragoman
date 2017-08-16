(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../utils/PropTypes/between'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../utils/PropTypes/between'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.between);
    global.Paper = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _between) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _between2 = _interopRequireDefault(_between);

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

  var Paper = function (_PureComponent) {
    _inherits(Paper, _PureComponent);

    function Paper() {
      _classCallCheck(this, Paper);

      return _possibleConstructorReturn(this, (Paper.__proto__ || Object.getPrototypeOf(Paper)).apply(this, arguments));
    }

    _createClass(Paper, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            Component = _props.component,
            zDepth = _props.zDepth,
            className = _props.className,
            raiseOnHover = _props.raiseOnHover,
            props = _objectWithoutProperties(_props, ['component', 'zDepth', 'className', 'raiseOnHover']);

        return _react2.default.createElement(Component, _extends({}, props, {
          className: (0, _classnames2.default)('md-paper md-paper--' + zDepth, {
            'md-paper--0-hover': zDepth === 0 && raiseOnHover
          }, className)
        }));
      }
    }]);

    return Paper;
  }(_react.PureComponent);

  Paper.propTypes = {
    /**
     * The component to render the paper as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

    /**
     * An optional className to apply.
     */
    className: _propTypes2.default.string,

    /**
     * The depth of the paper. This should be a number between 0 - 5. If
     * the depth is 0, it will raise to a depth of 3 on hover.
     */
    zDepth: (0, _between2.default)(_propTypes2.default.number.isRequired, 0, 5),

    /**
     * Any children to display in the paper.
     */
    children: _propTypes2.default.node,

    /**
     * Boolean if the paper should raise to the `zDepth` of `3` on hover when the initial
     * `zDepth` is `0`.
     */
    raiseOnHover: _propTypes2.default.bool
  };
  Paper.defaultProps = {
    zDepth: 1,
    component: 'div'
  };
  exports.default = Paper;
});