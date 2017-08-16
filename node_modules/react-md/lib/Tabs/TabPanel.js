(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', 'react-prop-types/lib/isRequiredForA11y'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('react-prop-types/lib/isRequiredForA11y'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.isRequiredForA11y);
    global.TabPanel = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _isRequiredForA11y) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

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

  var TabPanel = function (_PureComponent) {
    _inherits(TabPanel, _PureComponent);

    function TabPanel() {
      _classCallCheck(this, TabPanel);

      return _possibleConstructorReturn(this, (TabPanel.__proto__ || Object.getPrototypeOf(TabPanel)).apply(this, arguments));
    }

    _createClass(TabPanel, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            Component = _props.component,
            id = _props.id,
            active = _props.active,
            className = _props.className,
            controlledById = _props.controlledById,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['component', 'id', 'active', 'className', 'controlledById', 'children']);

        return _react2.default.createElement(
          Component,
          _extends({}, props, {
            id: id,
            className: (0, _classnames2.default)('md-tab-panel', className),
            role: 'tabpanel',
            'aria-hidden': !active,
            'aria-labelledby': controlledById
          }),
          children
        );
      }
    }]);

    return TabPanel;
  }(_react.PureComponent);

  TabPanel.propTypes = {
    /**
     * An id for the panel. This is used for a11y. This should equal the `controlsId`
     * of whichever tab's children will be placed in here.
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /**
     * An id for the tab that owns this panel. This should equal the `id` of whichever
     * tab's children will be placed in here.
     */
    controlledById: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /**
     * An optional style to apply.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply.
     */
    className: _propTypes2.default.string,

    /**
     * The component to render the panel as.
     */
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

    /**
     * Boolean if the panel is currently active. This is used to generated the `aria-hidden`
     * attribute.
     */
    active: _propTypes2.default.bool,

    /**
     * Any children to display.
     */
    children: _propTypes2.default.node
  };
  TabPanel.defaultProps = {
    component: 'div'
  };
  exports.default = TabPanel;
});