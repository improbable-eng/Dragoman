(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', 'react-prop-types/lib/isRequiredForA11y', '../utils/PropTypes/between'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('react-prop-types/lib/isRequiredForA11y'), require('../utils/PropTypes/between'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.isRequiredForA11y, global.between);
    global.LinearProgress = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _isRequiredForA11y, _between) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

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

  var LinearProgress = function (_PureComponent) {
    _inherits(LinearProgress, _PureComponent);

    function LinearProgress() {
      _classCallCheck(this, LinearProgress);

      return _possibleConstructorReturn(this, (LinearProgress.__proto__ || Object.getPrototypeOf(LinearProgress)).apply(this, arguments));
    }

    _createClass(LinearProgress, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            value = _props.value,
            query = _props.query,
            centered = _props.centered,
            props = _objectWithoutProperties(_props, ['className', 'value', 'query', 'centered']);

        var isDeterminate = typeof value === 'number';

        var accessibilityProps = {
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': 100
        };

        var style = void 0;
        if (isDeterminate) {
          style = { width: value + '%' };
          accessibilityProps['aria-valuenow'] = value;
        }

        return _react2.default.createElement(
          'div',
          _extends({}, props, {
            className: (0, _classnames2.default)('md-progress md-progress--linear', { 'md-block-centered': centered }, className)
          }),
          _react2.default.createElement('div', _extends({}, accessibilityProps, {
            style: style,
            className: (0, _classnames2.default)('md-progress--linear-active', {
              'md-progress--linear-query': query,
              'md-progress--linear-determinate': isDeterminate,
              'md-progress--linear-indeterminate': !isDeterminate
            })
          }))
        );
      }
    }]);

    return LinearProgress;
  }(_react.PureComponent);

  LinearProgress.propTypes = {
    /**
     * The `id` prop is required for accessibility concerns.
     * [Progress Bar Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role)
     *
     * > If the progressbar is describing the loading progress of a particular region of a page, the author
     * __SHOULD__ use aria-describedby to point to the status, and set the aria-busy attribute to true on the
     * region until it is finished loading. It is not possible for the user to alter the value of a progressbar
     * because it is always readonly.
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /* eslint-enable max-len */
    /**
     * An optional className to apply to the linear progress container.
     */
    className: _propTypes2.default.string,

    /**
     * The current value of the progress. If this value is defined, it will
     * be converted to a determinate circular progress. The progress will not
     * advance unless this value changes.
     *
     * This value should also be a number between 0 and 100.
     */
    value: (0, _between2.default)(_propTypes2.default.number, 0, 100),

    /**
     * Boolean if this should be a query indeterminate progress bar.
     */
    query: _propTypes2.default.bool,

    /**
     * Boolean if the Linear Progress should be centered. This
     * will only work if the `max-width` style is set.
     */
    centered: _propTypes2.default.bool
  };
  LinearProgress.defaultProps = {
    query: false
  };
  exports.default = LinearProgress;
});