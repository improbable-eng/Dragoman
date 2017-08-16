(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../Buttons/Button'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../Buttons/Button'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.Button);
    global.TabOverflowButton = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _Button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var TabOverflowButton = function (_PureComponent) {
    _inherits(TabOverflowButton, _PureComponent);

    function TabOverflowButton() {
      _classCallCheck(this, TabOverflowButton);

      return _possibleConstructorReturn(this, (TabOverflowButton.__proto__ || Object.getPrototypeOf(TabOverflowButton)).apply(this, arguments));
    }

    _createClass(TabOverflowButton, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            left = _props.left,
            icon = _props.icon,
            props = _objectWithoutProperties(_props, ['left', 'icon']);

        return _react2.default.createElement(_Button2.default, _extends({}, props, {
          icon: true,
          className: (0, _classnames2.default)('md-icon--inherit md-btn--tab-overflow', {
            'md-btn--tab-overflow-left': left,
            'md-btn--tab-overflow-right': !left,
            'md-btn--tab-overflow-icon': icon
          })
        }));
      }
    }]);

    return TabOverflowButton;
  }(_react.PureComponent);

  TabOverflowButton.propTypes = {
    left: _propTypes2.default.bool,
    icon: _propTypes2.default.bool
  };
  exports.default = TabOverflowButton;
});