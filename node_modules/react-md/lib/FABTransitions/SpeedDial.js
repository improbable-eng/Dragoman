(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-transition-group/CSSTransitionGroup', 'classnames', '../Buttons/Button'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-transition-group/CSSTransitionGroup'), require('classnames'), require('../Buttons/Button'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.CSSTransitionGroup, global.classnames, global.Button);
    global.SpeedDial = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _CSSTransitionGroup, _classnames, _Button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _Button2 = _interopRequireDefault(_Button);

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

  var SpeedDial = function (_PureComponent) {
    _inherits(SpeedDial, _PureComponent);

    function SpeedDial(props) {
      _classCallCheck(this, SpeedDial);

      var _this = _possibleConstructorReturn(this, (SpeedDial.__proto__ || Object.getPrototypeOf(SpeedDial)).call(this, props));

      _this.state = { isOpen: props.initiallyOpen };
      _this._handleClick = _this._handleClick.bind(_this);
      return _this;
    }

    _createClass(SpeedDial, [{
      key: '_isOpen',
      value: function _isOpen(props, state) {
        return typeof props.isOpen === 'undefined' ? state.isOpen : props.isOpen;
      }
    }, {
      key: '_handleClick',
      value: function _handleClick(e) {
        var _props = this.props,
            onClick = _props.onClick,
            onPassiveClick = _props.onPassiveClick,
            onActiveClick = _props.onActiveClick;

        if (onClick) {
          onClick(e);
        }

        var isOpen = this._isOpen(this.props, this.state);
        if (isOpen && onActiveClick) {
          onActiveClick(e);
        } else if (!isOpen && onPassiveClick) {
          onPassiveClick(e);
        }

        if (typeof this.props.isOpen === 'undefined') {
          this.setState({ isOpen: !isOpen });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            fabs = _props2.fabs,
            passiveIconChildren = _props2.passiveIconChildren,
            passiveIconClassName = _props2.passiveIconClassName,
            activeIconChildren = _props2.activeIconChildren,
            activeIconClassName = _props2.activeIconClassName,
            transitionName = _props2.transitionName,
            transitionEnterTimeout = _props2.transitionEnterTimeout,
            speedDialTransitionName = _props2.speedDialTransitionName,
            speedDialTransitionEnterTimeout = _props2.speedDialTransitionEnterTimeout,
            speedDialTransitionLeaveTimeout = _props2.speedDialTransitionLeaveTimeout,
            containerProps = _props2.containerProps,
            props = _objectWithoutProperties(_props2, ['fabs', 'passiveIconChildren', 'passiveIconClassName', 'activeIconChildren', 'activeIconClassName', 'transitionName', 'transitionEnterTimeout', 'speedDialTransitionName', 'speedDialTransitionEnterTimeout', 'speedDialTransitionLeaveTimeout', 'containerProps']);

        delete props.isOpen;
        delete props.initiallyOpen;

        var isOpen = this._isOpen(this.props, this.state);

        var speedDialFabs = void 0;
        if (isOpen) {
          speedDialFabs = fabs.map(function (fab, i) {
            var fn = void 0;
            var el = void 0;
            var fabProps = void 0;
            if (_react2.default.isValidElement(fab)) {
              el = _react2.default.Children.only(fab);
              fn = _react2.default.cloneElement;
              fabProps = fab.props;
            } else {
              el = _Button2.default;
              fn = _react2.default.createElement;
              fabProps = fab;
            }

            var created = fn(el, _extends({
              floating: true,
              mini: true
            }, fabProps));
            return _react2.default.createElement(
              'div',
              { key: i, className: 'md-speed-dial-fab' },
              created
            );
          });
        }

        props.iconClassName = isOpen ? activeIconClassName : passiveIconClassName;
        props.children = isOpen ? activeIconChildren : passiveIconChildren;
        return _react2.default.createElement(
          _CSSTransitionGroup2.default,
          _extends({}, containerProps, {
            component: 'div',
            className: (0, _classnames2.default)('md-speed-dial', !!containerProps && containerProps.className),
            transitionName: transitionName + '-' + (isOpen ? 'right' : 'left'),
            transitionEnterTimeout: transitionEnterTimeout,
            transitionLeave: false,
            ref: 'container'
          }),
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              component: 'div',
              key: 'speed-dial-fabs',
              transitionName: speedDialTransitionName,
              transitionEnterTimeout: speedDialTransitionEnterTimeout,
              transitionLeaveTimeout: speedDialTransitionLeaveTimeout
            },
            speedDialFabs
          ),
          _react2.default.createElement(_Button2.default, _extends({}, props, {
            floating: true,
            key: (isOpen ? 'open' : 'closed') + '-fab',
            onClick: this._handleClick
          }))
        );
      }
    }]);

    return SpeedDial;
  }(_react.PureComponent);

  SpeedDial.propTypes = {
    /**
     * A boolean if the speed dial is currently open. This will make
     * the speed dial into a controlled component.
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Boolean if the uncontrolled speed dial is initially open.
     */
    initiallyOpen: _propTypes2.default.bool,

    /**
     * An optional className to apply to the speed dial.
     */
    className: _propTypes2.default.string,

    /**
     * The speed dial's floating action button transition name when the button's
     * open state changes. If the button is open, `-right` is appened, otherwise
     * `-left`.
     */
    transitionName: _propTypes2.default.string.isRequired,

    /**
     * The timeout for the speed dial's floating action button transition.
     */
    transitionEnterTimeout: _propTypes2.default.number.isRequired,

    /**
     * The name for the flinging animation of the speed dial.
     */
    speedDialTransitionName: _propTypes2.default.string.isRequired,

    /**
     * The timeout for the flinging animation of the speed dial when opening.
     */
    speedDialTransitionEnterTimeout: _propTypes2.default.number.isRequired,

    /**
     * The timeout for the flinging animation when the speed dial is closing.
     */
    speedDialTransitionLeaveTimeout: _propTypes2.default.number.isRequired,

    /**
     * The optional children to display for unopened speed dial floating action button.
     */
    passiveIconChildren: _propTypes2.default.node,

    /**
     * The optional icon className to display for unopened speed dial floating action button.
     */
    passiveIconClassName: _propTypes2.default.node,

    /**
     * The optional children to display for opened speed dial floating action button.
     */
    activeIconChildren: _propTypes2.default.node,

    /**
     * The optional icon className to display for opened speed dial floating action button.
     */
    activeIconClassName: _propTypes2.default.string,

    /**
     * A list of `FloatingButton` or props to generate the `FloatinButton` when the
     * `SpeedDial` is open. The buttons will automatically be converted to the `mini`
     * version.
     */
    fabs: function fabs(props, propName, component) {
      for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        others[_key - 3] = arguments[_key];
      }

      var size = props.fabs.length;
      if (size >= 3 && size <= 5) {
        var _PropTypes$arrayOf;

        return (_PropTypes$arrayOf = _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
          onClick: _propTypes2.default.func,
          iconClassName: _propTypes2.default.string,
          children: _propTypes2.default.node
        })]))).isRequired.apply(_PropTypes$arrayOf, [props, propName, component].concat(others));
      }

      var middle = size < 3 ? 'at least 3' : 'no more than 5';
      return new Error('A speed dial requires ' + middle + ' floating action buttons to fling. ' + ('However, only ' + size + ' were given.'));
    },

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onClick: _propTypes2.default.func,

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onPassiveClick: _propTypes2.default.func,

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onActiveClick: _propTypes2.default.func,

    /**
     * Any additional props to apply to the speed dial itself.
     */
    containerProps: _propTypes2.default.object
  };
  SpeedDial.defaultProps = {
    initiallyOpen: false,
    transitionName: 'md-fab-rotate',
    transitionEnterTimeout: 150,
    speedDialTransitionName: 'md-speed-dial',
    speedDialTransitionEnterTimeout: 450,
    speedDialTransitionLeaveTimeout: 150,
    passiveIconClassName: 'material-icons',
    activeIconClassName: 'material-icons'
  };
  exports.default = SpeedDial;
});