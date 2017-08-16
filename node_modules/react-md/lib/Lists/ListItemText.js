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
    global.ListItemText = mod.exports;
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

  var ListItemText = function (_PureComponent) {
    _inherits(ListItemText, _PureComponent);

    function ListItemText() {
      _classCallCheck(this, ListItemText);

      return _possibleConstructorReturn(this, (ListItemText.__proto__ || Object.getPrototypeOf(ListItemText)).apply(this, arguments));
    }

    _createClass(ListItemText, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            active = _props.active,
            activeClassName = _props.activeClassName,
            disabled = _props.disabled,
            primaryText = _props.primaryText,
            secondaryText = _props.secondaryText,
            className = _props.className,
            threeLines = _props.threeLines,
            props = _objectWithoutProperties(_props, ['active', 'activeClassName', 'disabled', 'primaryText', 'secondaryText', 'className', 'threeLines']);

        var secondaryTextNode = void 0;
        if (secondaryText) {
          secondaryTextNode = _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('md-tile-text--secondary', {
                'md-text--disabled': disabled,
                'md-text--secondary': !disabled,
                'md-tile-text--three-lines': threeLines
              })
            },
            secondaryText
          );
        }

        return _react2.default.createElement(
          'div',
          _extends({}, props, { className: (0, _classnames2.default)('md-tile-content', className) }),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('md-tile-text--primary', _defineProperty({
                'md-text--disabled': disabled,
                'md-text': !disabled && !active
              }, activeClassName, !disabled && active))
            },
            primaryText
          ),
          secondaryTextNode
        );
      }
    }]);

    return ListItemText;
  }(_react.PureComponent);

  ListItemText.propTypes = {
    active: _propTypes2.default.bool,
    activeClassName: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    primaryText: _propTypes2.default.node.isRequired,
    secondaryText: _propTypes2.default.node,
    className: _propTypes2.default.string,
    threeLines: _propTypes2.default.bool
  };
  exports.default = ListItemText;
});