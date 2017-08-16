(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../constants/CSSTransitionGroupTick'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../constants/CSSTransitionGroupTick'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.CSSTransitionGroupTick);
    global.Tooltip = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _CSSTransitionGroupTick) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var Tooltip = function (_PureComponent) {
    _inherits(Tooltip, _PureComponent);

    function Tooltip(props) {
      _classCallCheck(this, Tooltip);

      var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

      _this.state = {
        entering: false,
        leaving: false,
        active: false,
        visible: false
      };

      _this._timeout = null;
      return _this;
    }

    _createClass(Tooltip, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
      }
    }, {
      key: 'componentWillEnter',
      value: function componentWillEnter(cb) {
        var _this2 = this;

        this._timeout = setTimeout(function () {
          _this2._timeout = setTimeout(function () {
            _this2._timeout = null;

            cb();
          }, _this2.props.enterTimeout);
          _this2.setState({ active: true });
        }, _CSSTransitionGroupTick2.default);

        this.setState({ entering: true });
      }
    }, {
      key: 'componentDidEnter',
      value: function componentDidEnter() {
        this.setState({ entering: false, active: false, visible: true });
      }
    }, {
      key: 'componentWillLeave',
      value: function componentWillLeave(cb) {
        var _this3 = this;

        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this3._timeout = setTimeout(function () {
            _this3._timeout = null;

            cb();
          }, _this3.props.leaveTimeout);

          _this3.setState({ active: true, visible: false });
        }, _CSSTransitionGroupTick2.default);

        this.setState({ leaving: true });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            active = _state.active,
            entering = _state.entering,
            leaving = _state.leaving,
            visible = _state.visible;
        var _props = this.props,
            style = _props.style,
            className = _props.className,
            children = _props.children,
            position = _props.position;


        var direction = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';
        return _react2.default.createElement(
          'span',
          {
            style: style,
            className: (0, _classnames2.default)('md-tooltip md-tooltip--' + position + ' md-tooltip--' + direction, _defineProperty({
              'md-tooltip--active': active,
              'md-tooltip--enter': entering,
              'md-tooltip--enter-active': entering && active,
              'md-tooltip--leave': leaving,
              'md-tooltip--leave-active': leaving && active
            }, 'md-tooltip--' + position + '-active', visible || entering && active), className)
          },
          children
        );
      }
    }]);

    return Tooltip;
  }(_react.PureComponent);

  Tooltip.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    position: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    children: _propTypes2.default.node.isRequired,
    enterTimeout: _propTypes2.default.number.isRequired,
    leaveTimeout: _propTypes2.default.number.isRequired
  };
  exports.default = Tooltip;
});