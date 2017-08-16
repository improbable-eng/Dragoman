(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames);
    global.TileAddon = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

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

  var TileAddon = function (_PureComponent) {
    _inherits(TileAddon, _PureComponent);

    function TileAddon() {
      _classCallCheck(this, TileAddon);

      return _possibleConstructorReturn(this, (TileAddon.__proto__ || Object.getPrototypeOf(TileAddon)).apply(this, arguments));
    }

    _createClass(TileAddon, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            icon = _props.icon,
            avatar = _props.avatar,
            active = _props.active,
            activeClassName = _props.activeClassName,
            style = _props.style,
            className = _props.className;

        if (!icon && !avatar) {
          return null;
        }

        var avatarIcon = false;
        if (avatar) {
          var avatarChild = _react2.default.Children.only(avatar);
          if (avatarChild.props.iconSized) {
            avatarIcon = true;
          }
        }
        return _react2.default.createElement(
          'div',
          {
            style: style,
            className: (0, _classnames2.default)('md-tile-addon', _defineProperty({
              'md-tile-addon--icon': icon || avatarIcon,
              'md-tile-addon--avatar': avatar && !avatarIcon
            }, activeClassName, active), className)
          },
          icon || avatar
        );
      }
    }]);

    return TileAddon;
  }(_react.PureComponent);

  TileAddon.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    active: _propTypes2.default.bool,
    activeClassName: _propTypes2.default.string,
    icon: _propTypes2.default.node,
    avatar: _propTypes2.default.node
  };
  exports.default = TileAddon;
});