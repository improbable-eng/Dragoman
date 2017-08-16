(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes);
    global.contextTypes = mod.exports;
  }
})(this, function (exports, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    onExpandClick: _propTypes2.default.func,
    expanded: _propTypes2.default.bool,
    iconClassName: _propTypes2.default.string,
    iconChildren: _propTypes2.default.node,
    tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipLabel: _propTypes2.default.node,
    tooltipDelay: _propTypes2.default.number
  };
});