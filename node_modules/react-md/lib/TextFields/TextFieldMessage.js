(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', './Message'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('./Message'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.classnames, global.Message);
    global.TextFieldMessage = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _Message) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _Message2 = _interopRequireDefault(_Message);

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

  var TextFieldMessage = function (_PureComponent) {
    _inherits(TextFieldMessage, _PureComponent);

    function TextFieldMessage(props) {
      _classCallCheck(this, TextFieldMessage);

      var _this = _possibleConstructorReturn(this, (TextFieldMessage.__proto__ || Object.getPrototypeOf(TextFieldMessage)).call(this, props));

      _this.state = {
        message: props.error && props.errorText || props.helpText || props.errorText,
        isMessageVisible: _this._isMessageVisible(props)
      };
      return _this;
    }

    _createClass(TextFieldMessage, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var keys = ['active', 'error', 'helpOnFocus', 'helpText', 'errorText'];
        if (this._anyChanges(keys, this.props, nextProps)) {
          this.setState({
            isMessageVisible: this._isMessageVisible(nextProps),
            message: nextProps.error && nextProps.errorText || nextProps.helpText || nextProps.errorText
          });
        }
      }
    }, {
      key: '_anyChanges',
      value: function _anyChanges(keys, p1, p2) {
        var changed = false;
        keys.some(function (key) {
          if (p1[key] !== p2[key]) {
            changed = true;
          }

          return changed;
        });

        return changed;
      }
    }, {
      key: '_isMessageVisible',
      value: function _isMessageVisible(props) {
        var error = props.error,
            errorText = props.errorText,
            helpText = props.helpText,
            helpOnFocus = props.helpOnFocus,
            active = props.active;

        return (error && errorText || !!helpText) && (!helpOnFocus || active);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            maxLength = _props.maxLength,
            error = _props.error,
            className = _props.className,
            errorText = _props.errorText,
            helpText = _props.helpText,
            currentLength = _props.currentLength,
            leftIcon = _props.leftIcon,
            rightIcon = _props.rightIcon,
            block = _props.block,
            active = _props.active;
        var _state = this.state,
            isMessageVisible = _state.isMessageVisible,
            message = _state.message;


        if (currentLength === 'undefined' || !helpText && !errorText && !maxLength) {
          return null;
        }

        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('md-text-field-message-container', {
              'md-text-field-message-container--error': error,
              'md-text-field-message-container--count-only': !message || !isMessageVisible,
              'md-text-field-message-container--left-icon-offset': leftIcon,
              'md-text-field-message-container--right-icon-offset': rightIcon,
              'md-full-width': !block
            }, className)
          },
          _react2.default.createElement(
            _Message2.default,
            { key: 'message', active: isMessageVisible },
            message
          ),
          _react2.default.createElement(
            _Message2.default,
            { key: 'counter', className: 'md-text-field-message--counter', active: active },
            maxLength ? currentLength + ' / ' + maxLength : null
          )
        );
      }
    }]);

    return TextFieldMessage;
  }(_react.PureComponent);

  TextFieldMessage.propTypes = {
    className: _propTypes2.default.string,
    error: _propTypes2.default.bool,
    helpText: _propTypes2.default.node,
    errorText: _propTypes2.default.node,
    active: _propTypes2.default.bool,
    helpOnFocus: _propTypes2.default.bool,
    maxLength: _propTypes2.default.number,
    currentLength: _propTypes2.default.number,
    leftIcon: _propTypes2.default.bool,
    rightIcon: _propTypes2.default.bool,
    block: _propTypes2.default.bool
  };
  exports.default = TextFieldMessage;
});