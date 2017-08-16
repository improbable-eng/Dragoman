(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-prop-types/lib/deprecated', 'react-prop-types/lib/isRequiredForA11y', '../utils/PropTypes/controlled', './SelectionControl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-prop-types/lib/deprecated'), require('react-prop-types/lib/isRequiredForA11y'), require('../utils/PropTypes/controlled'), require('./SelectionControl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.deprecated, global.isRequiredForA11y, global.controlled, global.SelectionControl);
    global.Switch = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _deprecated, _isRequiredForA11y, _controlled, _SelectionControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _deprecated2 = _interopRequireDefault(_deprecated);

  var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

  var _controlled2 = _interopRequireDefault(_controlled);

  var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

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

  var Switch = function (_PureComponent) {
    _inherits(Switch, _PureComponent);

    function Switch() {
      _classCallCheck(this, Switch);

      return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
    }

    _createClass(Switch, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            toggled = _props.toggled,
            defaultToggled = _props.defaultToggled,
            props = _objectWithoutProperties(_props, ['toggled', 'defaultToggled']);

        if (typeof toggled !== 'undefined' && typeof props.checked === 'undefined') {
          props.checked = toggled;
        }

        if (typeof defaultToggled !== 'undefined' && typeof props.defaultChecked === 'undefined') {
          props.defaultChecked = defaultToggled;
        }

        return _react2.default.createElement(_SelectionControl2.default, _extends({ type: 'switch' }, props, { __superSecreteProp: true }));
      }
    }]);

    return Switch;
  }(_react.PureComponent);

  Switch.propTypes = {
    /**
     * An id to use with the switch. This is used for accessibility and so that the label
     * triggers the switch toggle.
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

    /**
     * An optional style to apply to the switch's container.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the switch's container.
     */
    className: _propTypes2.default.string,

    /**
     * A label to display with the switch. This is required for accessibility and triggering
     * the toggle.
     */
    label: _propTypes2.default.node,

    /**
     * Boolean if the label should appear before the switch.
     */
    labelBefore: _propTypes2.default.bool,

    /**
     * A name to use for the `Switch`. This is required for accessibility since behind the scenes
     * the `Switch` is renders as an `<input type="checkbox" />`.
     */
    name: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /**
     * Boolean if the `Switch` is disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * An optional function to call when the `checked` state of the `Switch` changes.
     * The callback will incude the new checked state and the changeEvent.
     *
     * ```js
     * onChange(changeEvent.target.checked, changeEvent);
     * ```
     */
    onChange: _propTypes2.default.func,

    /**
     * An optional value for the `Switch`. It is recommended to use a value though.
     */
    value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),

    /**
     * Boolean if the `Switch` is checked by default.
     */
    defaultChecked: _propTypes2.default.bool,

    /**
     * A boolean if the `Switch` is currently checked. This will required the `onChange` prop
     * to be defined.
     */
    checked: (0, _controlled2.default)(_propTypes2.default.bool, 'onChange', 'defaultChecked'),

    defaultToggled: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use the `defaultChecked` prop instead'),
    toggled: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use the `checked` prop instead')
  };
  exports.default = Switch;
});