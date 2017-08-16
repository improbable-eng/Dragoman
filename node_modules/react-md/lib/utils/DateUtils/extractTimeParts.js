(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formatTime'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formatTime'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formatTime);
    global.extractTimeParts = mod.exports;
  }
})(this, function (exports, _formatTime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = extractTimeParts;

  var _formatTime2 = _interopRequireDefault(_formatTime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /**
   * Extracts the hours, minutes, and optional time period from
   * a date time.
   *
   * @param {function} DateTimeFormat the DateTimeFormat function to use.
   * @param {string|string[]} locales the locales to use.
   * @param {Date} time the time to extract from.
   * @return {Object} an object of { hours, minutes, timePeriod }
   */
  function extractTimeParts(DateTimeFormat, locales, time) {
    var formatted = (0, _formatTime2.default)(DateTimeFormat, locales, time);

    // IE does not like lookaheads or splitting on [^0-9]
    // it will include the non-printable characters..

    var _formatted$match = formatted.match(/[0-9]+/g),
        _formatted$match2 = _slicedToArray(_formatted$match, 2),
        hours = _formatted$match2[0],
        minutes = _formatted$match2[1];

    var _formatted$match3 = formatted.match(/[ ,.:A-z]+/g),
        _formatted$match4 = _toArray(_formatted$match3),
        separator = _formatted$match4[0],
        remaining = _formatted$match4.slice(1);

    var timePeriod = void 0;
    if (remaining && remaining.length) {
      timePeriod = remaining.join('').trim();
    }

    return {
      hours: hours,
      minutes: separator + minutes,
      timePeriod: timePeriod
    };
  }
});