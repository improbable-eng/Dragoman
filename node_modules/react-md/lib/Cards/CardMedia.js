(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', 'react-prop-types/lib/deprecated', '../utils/PropTypes/componentDeprecated', '../Media/Media', '../Media/MediaOverlay'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('react-prop-types/lib/deprecated'), require('../utils/PropTypes/componentDeprecated'), require('../Media/Media'), require('../Media/MediaOverlay'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.deprecated, global.componentDeprecated, global.Media, global.MediaOverlay);
    global.CardMedia = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _deprecated, _componentDeprecated, _Media, _MediaOverlay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _deprecated2 = _interopRequireDefault(_deprecated);

  var _componentDeprecated2 = _interopRequireDefault(_componentDeprecated);

  var _Media2 = _interopRequireDefault(_Media);

  var _MediaOverlay2 = _interopRequireDefault(_MediaOverlay);

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

  var CardMedia = function (_PureComponent) {
    _inherits(CardMedia, _PureComponent);

    function CardMedia() {
      _classCallCheck(this, CardMedia);

      return _possibleConstructorReturn(this, (CardMedia.__proto__ || Object.getPrototypeOf(CardMedia)).apply(this, arguments));
    }

    _createClass(CardMedia, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['className', 'children']);

        delete props.overlay;

        var overlay = this.props.overlay;

        if (overlay) {
          overlay = _react2.default.createElement(
            _MediaOverlay2.default,
            null,
            overlay
          );
        }

        return _react2.default.createElement(
          _Media2.default,
          _extends({ className: (0, _classnames2.default)('md-card-media', className) }, props),
          children,
          overlay
        );
      }
    }]);

    return CardMedia;
  }(_react.PureComponent);

  CardMedia.aspect = {
    equal: '1-1',
    wide: '16-9'
  };
  CardMedia.propTypes = {
    /**
     * An optional className to apply to the card media component.
     */
    className: _propTypes2.default.string,

    /**
     * An optional overlay component to be rendered over the media. This *should*
     * be A `CardTitle`, `CardActions` or both.
     */
    overlay: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `MediaOverlay` component as a child instead'),

    /**
     * Any media to display.
     */
    children: _propTypes2.default.node,

    /**
     * Boolean if the aspect ratio should be forced.
     */
    forceAspect: _propTypes2.default.bool,

    /**
     * The aspect ratio to use.
     */
    aspectRatio: _propTypes2.default.oneOf([CardMedia.aspect.equal, CardMedia.aspect.wide]).isRequired,

    /**
     * Boolean if this component should be expandable when there is a `CardExpander`
     * above it in the `Card`.
     */
    expandable: _propTypes2.default.bool,

    /**
     * The component to render the card media as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

    deprecated: (0, _componentDeprecated2.default)('There were no unique styles for media in cards so it is simpler to just use the ' + '`Media` component.')
  };
  CardMedia.defaultProps = {
    forceAspect: true,
    aspectRatio: CardMedia.aspect.wide,
    component: 'section'
  };
  exports.default = CardMedia;
});