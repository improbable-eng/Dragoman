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
    global.CircularProgress = mod.exports;
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

  var ROATE_DISTANCE = 360 * 1.75;
  var BASE_SIZE = 24; // font-icon font size

  /**
   * The `CircularProgress` component is used to give visual feedback while your app
   * is loading.
   *
   * There are two different types of circular progress bars: `Determinate` and `Indeterminate`.
   *
   * A `Determinate` circular progress bar should be used when you want to keep track of the current
   * progress. An example would be downloading a file.
   *
   * An `Indeterminate` circular progress bar should be used when you can not keep track of the progress
   * yourself. An example would be waiting for some API call to complete.
   */

  var CircularProgress = function (_PureComponent) {
    _inherits(CircularProgress, _PureComponent);

    function CircularProgress() {
      _classCallCheck(this, CircularProgress);

      return _possibleConstructorReturn(this, (CircularProgress.__proto__ || Object.getPrototypeOf(CircularProgress)).apply(this, arguments));
    }

    _createClass(CircularProgress, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            scale = _props.scale,
            style = _props.style,
            className = _props.className,
            value = _props.value,
            determinateDashoffset = _props.determinateDashoffset,
            centered = _props.centered,
            props = _objectWithoutProperties(_props, ['scale', 'style', 'className', 'value', 'determinateDashoffset', 'centered']);

        var isDeterminate = typeof value === 'number';
        var circleStyle = void 0;
        var svgStyle = style;
        if (isDeterminate) {
          var rotate = 'rotate3d(0, 0, 1, ' + ROATE_DISTANCE / 100 * value + 'deg)';
          circleStyle = {
            strokeDashoffset: determinateDashoffset - determinateDashoffset / 100 * value
          };

          svgStyle = Object.assign({}, style, {
            WebkitTransform: (0, _classnames2.default)(style.WebkitTransform, rotate),
            MozTransform: (0, _classnames2.default)(style.MozTransform, rotate),
            transform: (0, _classnames2.default)(style.transform, rotate)
          });
        }

        var accessibilityProps = {
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': 100
        };

        if (isDeterminate) {
          accessibilityProps['aria-valuenow'] = value;
        }

        return _react2.default.createElement(
          'svg',
          _extends({}, props, accessibilityProps, {
            style: svgStyle,
            className: (0, _classnames2.default)('md-progress md-progress--circular', {
              'md-block-centered': centered,
              'md-progress--circular-determinate': isDeterminate,
              'md-progress--circular-indeterminate': !isDeterminate
            }, className),
            width: scale * BASE_SIZE,
            height: scale * BASE_SIZE,
            viewBox: '0 0 66 66'
          }),
          _react2.default.createElement('circle', {
            className: (0, _classnames2.default)('md-circular-progress-path', {
              'md-circular-progress-path--animated': !isDeterminate
            }),
            strokeWidth: '6',
            strokeLinecap: 'round',
            style: circleStyle,
            cx: '33',
            cy: '33',
            r: '30'
          })
        );
      }
    }]);

    return CircularProgress;
  }(_react.PureComponent);

  CircularProgress.propTypes = {
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
     * A style object to apply to the svg. If this is a determinate `CircularProgress`,
     * the `transform` (and vendor prefixes) styles will be merged with the current
     * progress rotation.
     */
    style: _propTypes2.default.object.isRequired,

    /**
     * An optional className to apply to the svg.
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
     * The scale for the circular progress.
     */
    scale: _propTypes2.default.number.isRequired,

    /**
     * You probably don't want to update this. I'm not good at svg. This should
     * match the scss variable `$md-circular-progress-stroke-dashoffset`.
     */
    determinateDashoffset: _propTypes2.default.number.isRequired,

    /**
     * Boolean if the the progress should be centered in it's container.
     */
    centered: _propTypes2.default.bool
  };
  CircularProgress.defaultProps = {
    style: {},
    scale: 1,
    determinateDashoffset: 187,
    centered: true
  };
  exports.default = CircularProgress;
});