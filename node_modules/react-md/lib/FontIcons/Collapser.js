(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', './FontIcon'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('./FontIcon'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.FontIcon);
    global.Collapser = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _FontIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _FontIcon2 = _interopRequireDefault(_FontIcon);

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

  var Collapser = function (_PureComponent) {
    _inherits(Collapser, _PureComponent);

    function Collapser(props) {
      _classCallCheck(this, Collapser);

      var _this = _possibleConstructorReturn(this, (Collapser.__proto__ || Object.getPrototypeOf(Collapser)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(Collapser, [{
      key: 'render',
      value: function render() {
        var _cn;

        var _props = this.props,
            className = _props.className,
            flipped = _props.flipped,
            suffix = _props.suffix,
            suffixFlipped = _props.suffixFlipped,
            props = _objectWithoutProperties(_props, ['className', 'flipped', 'suffix', 'suffixFlipped']);

        return _react2.default.createElement(_FontIcon2.default, _extends({
          key: 'collapser'
        }, props, {
          className: (0, _classnames2.default)('md-collapser', (_cn = {
            'md-collapser--flipped': flipped && (!suffixFlipped || !suffix)
          }, _defineProperty(_cn, 'md-collapser--' + suffix, suffix), _defineProperty(_cn, 'md-collapser--' + suffix + '-flipped', suffix && flipped && suffixFlipped), _cn), className)
        }));
      }
    }]);

    return Collapser;
  }(_react.PureComponent);

  Collapser.propTypes = {
    className: _propTypes2.default.string,
    iconClassName: _propTypes2.default.string,
    children: _propTypes2.default.node,
    flipped: _propTypes2.default.bool,
    suffix: _propTypes2.default.string,
    suffixFlipped: _propTypes2.default.bool
  };
  Collapser.defaultProps = {
    children: 'keyboard_arrow_down'
  };
  exports.default = Collapser;
});