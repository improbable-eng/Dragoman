(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './TabsContainer', './Tabs', './Tab', './MenuTab', './TabPanel'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./TabsContainer'), require('./Tabs'), require('./Tab'), require('./MenuTab'), require('./TabPanel'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.TabsContainer, global.Tabs, global.Tab, global.MenuTab, global.TabPanel);
    global.index = mod.exports;
  }
})(this, function (exports, _TabsContainer, _Tabs2, _Tab2, _MenuTab2, _TabPanel2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TabPanel = exports.MenuTab = exports.Tab = exports.Tabs = exports.TabsContainer = undefined;

  var _TabsContainer2 = _interopRequireDefault(_TabsContainer);

  var _Tabs3 = _interopRequireDefault(_Tabs2);

  var _Tab3 = _interopRequireDefault(_Tab2);

  var _MenuTab3 = _interopRequireDefault(_MenuTab2);

  var _TabPanel3 = _interopRequireDefault(_TabPanel2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _TabsContainer2.default;
  exports.TabsContainer = _TabsContainer2.default;
  exports.Tabs = _Tabs3.default;
  exports.Tab = _Tab3.default;
  exports.MenuTab = _MenuTab3.default;
  exports.TabPanel = _TabPanel3.default;
});