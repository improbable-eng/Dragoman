(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-motion'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-motion'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactMotion);
    global.TabIndicator = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactMotion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var TabIndicator = function (_PureComponent) {
    _inherits(TabIndicator, _PureComponent);

    function TabIndicator() {
      _classCallCheck(this, TabIndicator);

      return _possibleConstructorReturn(this, (TabIndicator.__proto__ || Object.getPrototypeOf(TabIndicator)).apply(this, arguments));
    }

    _createClass(TabIndicator, [{
      key: 'render',
      value: function render() {
        var visible = this.props.visible;

        return _react2.default.createElement(
          _reactMotion.Motion,
          {
            style: {
              x: (0, _reactMotion.spring)(this.props.offset),
              width: (0, _reactMotion.spring)(this.props.width),
              height: (0, _reactMotion.spring)(visible ? 2 : 0)
            }
          },
          function (_ref) {
            var x = _ref.x,
                height = _ref.height,
                width = _ref.width;

            var transform = 'translate3d(' + x + 'px, 0, 0)';
            return _react2.default.createElement('span', {
              style: {
                height: height,
                width: width,
                WebkitTransform: transform,
                MozTransform: transform,
                msTransform: transform,
                transform: transform
              },
              className: 'md-tab-indicator'
            });
          }
        );
      }
    }]);

    return TabIndicator;
  }(_react.PureComponent);

  TabIndicator.propTypes = {
    offset: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    visible: _propTypes2.default.bool
  };
  exports.default = TabIndicator;
});