(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'classnames', './contextTypes', '../Buttons/Button'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('classnames'), require('./contextTypes'), require('../Buttons/Button'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.classnames, global.contextTypes, global.Button);
    global.CardExpander = mod.exports;
  }
})(this, function (exports, _react, _classnames, _contextTypes, _Button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _contextTypes2 = _interopRequireDefault(_contextTypes);

  var _Button2 = _interopRequireDefault(_Button);

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

  var CardExpander = function (_Component) {
    _inherits(CardExpander, _Component);

    function CardExpander() {
      _classCallCheck(this, CardExpander);

      return _possibleConstructorReturn(this, (CardExpander.__proto__ || Object.getPrototypeOf(CardExpander)).apply(this, arguments));
    }

    _createClass(CardExpander, [{
      key: 'render',
      value: function render() {
        var _context = this.context,
            expanded = _context.expanded,
            onExpandClick = _context.onExpandClick,
            iconClassName = _context.iconClassName,
            iconChildren = _context.iconChildren,
            tooltipPosition = _context.tooltipPosition,
            tooltipLabel = _context.tooltipLabel,
            tooltipDelay = _context.tooltipDelay;


        return _react2.default.createElement(
          _Button2.default,
          {
            icon: true,
            className: (0, _classnames2.default)('md-collapser md-collapser--card', {
              'md-collapser--flipped': expanded
            }),
            onClick: onExpandClick,
            iconClassName: iconClassName,
            tooltipLabel: tooltipLabel,
            tooltipDelay: tooltipDelay,
            tooltipPosition: tooltipPosition
          },
          iconChildren
        );
      }
    }]);

    return CardExpander;
  }(_react.Component);

  CardExpander.contextTypes = _contextTypes2.default;
  exports.default = CardExpander;
});