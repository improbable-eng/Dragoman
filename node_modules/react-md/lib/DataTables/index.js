(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DataTable', './TableHeader', './TableBody', './TableRow', './TableColumn', './EditDialogColumn', './TablePagination', './TableCardHeader', './SelectFieldColumn'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DataTable'), require('./TableHeader'), require('./TableBody'), require('./TableRow'), require('./TableColumn'), require('./EditDialogColumn'), require('./TablePagination'), require('./TableCardHeader'), require('./SelectFieldColumn'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DataTable, global.TableHeader, global.TableBody, global.TableRow, global.TableColumn, global.EditDialogColumn, global.TablePagination, global.TableCardHeader, global.SelectFieldColumn);
    global.index = mod.exports;
  }
})(this, function (exports, _DataTable2, _TableHeader2, _TableBody2, _TableRow2, _TableColumn2, _EditDialogColumn2, _TablePagination2, _TableCardHeader2, _SelectFieldColumn2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectFieldColumn = exports.TableCardHeader = exports.TablePagination = exports.EditDialogColumn = exports.TableColumn = exports.TableRow = exports.TableBody = exports.TableHeader = exports.DataTable = undefined;

  var _DataTable3 = _interopRequireDefault(_DataTable2);

  var _TableHeader3 = _interopRequireDefault(_TableHeader2);

  var _TableBody3 = _interopRequireDefault(_TableBody2);

  var _TableRow3 = _interopRequireDefault(_TableRow2);

  var _TableColumn3 = _interopRequireDefault(_TableColumn2);

  var _EditDialogColumn3 = _interopRequireDefault(_EditDialogColumn2);

  var _TablePagination3 = _interopRequireDefault(_TablePagination2);

  var _TableCardHeader3 = _interopRequireDefault(_TableCardHeader2);

  var _SelectFieldColumn3 = _interopRequireDefault(_SelectFieldColumn2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _DataTable3.default;
  exports.DataTable = _DataTable3.default;
  exports.TableHeader = _TableHeader3.default;
  exports.TableBody = _TableBody3.default;
  exports.TableRow = _TableRow3.default;
  exports.TableColumn = _TableColumn3.default;
  exports.EditDialogColumn = _EditDialogColumn3.default;
  exports.TablePagination = _TablePagination3.default;
  exports.TableCardHeader = _TableCardHeader3.default;
  exports.SelectFieldColumn = _SelectFieldColumn3.default;
});