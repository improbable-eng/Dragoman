(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../Drawers/Drawer', '../utils/PropTypes/componentDeprecated'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../Drawers/Drawer'), require('../utils/PropTypes/componentDeprecated'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Drawer, global.componentDeprecated);
    global.Sidebar = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Drawer, _componentDeprecated) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Drawer2 = _interopRequireDefault(_Drawer);

  var _componentDeprecated2 = _interopRequireDefault(_componentDeprecated);

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

  var Sidebar = function (_PureComponent) {
    _inherits(Sidebar, _PureComponent);

    function Sidebar() {
      _classCallCheck(this, Sidebar);

      return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            isOpen = _props.isOpen,
            header = _props.header,
            overlay = _props.overlay,
            children = _props.children,
            onOverlayClick = _props.onOverlayClick,
            align = _props.align,
            items = _props.items,
            fixed = _props.fixed,
            props = _objectWithoutProperties(_props, ['isOpen', 'header', 'overlay', 'children', 'onOverlayClick', 'align', 'items', 'fixed']);

        delete props.responsive;

        return _react2.default.createElement(
          _Drawer2.default,
          _extends({}, props, {
            visible: isOpen,
            onVisibilityChange: onOverlayClick,
            navItems: items,
            position: align,
            overflay: overlay,
            header: header,
            inline: !fixed
          }),
          children
        );
      }
    }]);

    return Sidebar;
  }(_react.PureComponent);

  Sidebar.propTypes = {
    deprecated: (0, _componentDeprecated2.default)('All the functionality and responsiveness of a `Sidebar` can be handled by the `Drawer` instead.' + ' Switch to the `Drawer` component instead.'),

    /**
     * Boolean if the overlay should appear when opened.
     */
    overlay: _propTypes2.default.bool,

    /**
     * Boolean if the sidebar is visible and open.
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Boolean if the sidebar is fixed to the side of the page.
     */
    fixed: _propTypes2.default.bool,

    /**
     * Boolean if sidebar should be responsive.
     */
    responsive: _propTypes2.default.bool,

    /**
     * An optional header to display above the children or list items.
     */
    header: _propTypes2.default.node,

    /**
     * Any children to display after the generated list of items.
     */
    children: _propTypes2.default.node,

    /**
     * An optional className to apply.
     */
    className: _propTypes2.default.string,

    /**
     * The transition name to use for the overlay.
     */
    transitionName: _propTypes2.default.string,

    /**
     * The enter timeout for the overlay transition.
     */
    transitionEnterTimeout: _propTypes2.default.number,

    /**
     * The leave timeout for the overlay transition.
     */
    transitionLeaveTimeout: _propTypes2.default.number,

    /**
     * An optional function to call when the overlay is clicked.
     * This should normally close the sidebar.
     */
    onOverlayClick: _propTypes2.default.func,

    /**
     * The position to align the sidebar of the screen to.
     */
    align: _propTypes2.default.oneOf(['left', 'right']),

    /**
     * A list of item props to convert into `ListItem`, `Divider`, or
     * `Subheader` components.
     *
     * ##### Item Descriptions
     */
    items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      /**
       * Boolean if this item is a divider.
       */
      divider: _propTypes2.default.bool,

      /**
       * Boolean if this item is a subheader.
       */
      subheader: _propTypes2.default.bool,

      /**
       * The primary text to display in a `ListItem` or a `Subheader`.
       */
      primaryText: _propTypes2.default.node
    }))
  };
  Sidebar.defaultProps = {
    align: 'left'
  };
  exports.default = Sidebar;
});