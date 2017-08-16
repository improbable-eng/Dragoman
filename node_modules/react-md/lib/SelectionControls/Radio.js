(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-prop-types/lib/deprecated', 'react-prop-types/lib/isRequiredForA11y', './SelectionControl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-prop-types/lib/deprecated'), require('react-prop-types/lib/isRequiredForA11y'), require('./SelectionControl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.deprecated, global.isRequiredForA11y, global.SelectionControl);
    global.Radio = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _deprecated, _isRequiredForA11y, _SelectionControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _deprecated2 = _interopRequireDefault(_deprecated);

  var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

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

  var Radio = function (_PureComponent) {
    _inherits(Radio, _PureComponent);

    function Radio() {
      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    _createClass(Radio, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            checkedIconChildren = _props.checkedIconChildren,
            checkedIconClassName = _props.checkedIconClassName,
            uncheckedIconChildren = _props.uncheckedIconChildren,
            uncheckedIconClassName = _props.uncheckedIconClassName,
            props = _objectWithoutProperties(_props, ['checkedIconChildren', 'checkedIconClassName', 'uncheckedIconChildren', 'uncheckedIconClassName']);

        return _react2.default.createElement(_SelectionControl2.default, _extends({
          type: 'radio',
          checkedRadioIconChildren: checkedIconChildren,
          checkedRadioIconClassName: checkedIconClassName,
          uncheckedRadioIconChildren: uncheckedIconChildren,
          uncheckedRadioIconClassName: uncheckedIconClassName,
          __superSecreteProp: true
        }, props));
      }
    }]);

    return Radio;
  }(_react.PureComponent);

  Radio.propTypes = {
    /**
     * An id to use with the radio. This is used for accessibility and so that the label
     * triggers the radio toggle.
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

    /**
     * An optional style to apply to the radio's container.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the radio's container.
     */
    className: _propTypes2.default.string,

    /**
     * A label to display with the radio. This is required for accessibility and triggering
     * the toggle.
     */
    label: _propTypes2.default.node.isRequired,

    /**
     * Boolean if the label should appear before the radio icon.
     */
    labelBefore: _propTypes2.default.bool,

    /**
     * A name to use for the `Radio`. This is required for accessibility.
     */
    name: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /**
     * Boolean if the `Radio` is disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * A function to call when the `Radio` triggers the `change` event. The `onChange` callback
     * will include the current value of the checked `radio` and the change event.
     *
     * ```js
     * onChange(changeEvent.target.value, changeEvent);
     * ```
     */
    onChange: _propTypes2.default.func,

    /**
     * The value for the `Radio` component.
     */
    value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]).isRequired,

    /**
     * A boolean if the `Radio` is currently checked.
     */
    checked: _propTypes2.default.bool.isRequired,

    /**
     * Boolean if the `Radio` should be displayed inline.
     */
    inline: _propTypes2.default.bool,

    /**
     * Any children to use for the checked `FontIcon` of the `Radio`.
     */
    checkedIconChildren: _propTypes2.default.node,

    /**
     * An icon className to use for the checked `FontIcon` of the `Radio`.
     */
    checkedIconClassName: _propTypes2.default.string,

    /**
     * Any children to use for the unchecked `FontIcon` of the `Radio`.
     */
    uncheckedIconChildren: _propTypes2.default.node,

    /**
     * An icon className to use for the unchecked `FontIcon` of the `Radio`.
     */
    uncheckedIconClassName: _propTypes2.default.string,

    checkedIcon: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `checkedIconChildren` and `checkedIconClassName` props instead.'),
    uncheckedIcon: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `uncheckedIconChildren` and `uncheckedIconClassName` props instead.')
  };
  Radio.defaultProps = {
    checkedIconChildren: 'radio_button_checked',
    uncheckedIconChildren: 'radio_button_unchecked'
  };
  exports.default = Radio;
});