'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = require('igroot/lib/alert');

var _alert2 = _interopRequireDefault(_alert);

var _input = require('igroot/lib/input');

var _input2 = _interopRequireDefault(_input);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/alert/style');

require('igroot/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timer = void 0;

var IpInput = function (_React$Component) {
  _inherits(IpInput, _React$Component);

  function IpInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IpInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IpInput.__proto__ || Object.getPrototypeOf(IpInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      validate: {
        success: true,
        msg: '检测通过'
      }
    }, _this.handleNumberChange = function (e) {
      clearTimeout(timer);

      var value = e.target.value;


      value = value.replace(/[^a-z0-9.:]/g, '').replace(/\s+/g, '');
      if (!value) {
        _this.props.onChange(value);
        return _this.setState({
          validate: { success: true, msg: '检测通过' }
        });
      }

      _this.setState({
        validate: { success: false, msg: '正在检测' }
      });

      timer = setTimeout(function () {
        _this.validate(value);
      }, 1000);

      _this.props.onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IpInput, [{
    key: 'validate',
    value: function validate(value) {
      clearTimeout(timer);
      var _props$type = this.props.type,
          type = _props$type === undefined ? 'ipv4' : _props$type;

      var ipv4Reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
      var ipv6Reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

      var isIPv4 = ipv4Reg.test(value);
      var isIPv6 = ipv6Reg.test(value);

      if (type === 'ipv4') {
        if (!isIPv4) {
          return this.setState({
            validate: { success: false, msg: '没有通过IPv4检测' }
          });
        }
      }

      if (type === 'ipv6') {
        if (!isIPv6) {
          return this.setState({
            validate: { success: false, msg: '没有通过IPv6检测' }
          });
        }
      }

      if (isIPv4 || isIPv6) {
        return this.setState({
          validate: { success: true, msg: '检测通过' }
        });
      } else {
        return this.setState({
          validate: { success: false, msg: '没有通过IPv4或IPv6检测' }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;
      var _state$validate = this.state.validate,
          success = _state$validate.success,
          msg = _state$validate.msg;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_input2.default, { value: value, onChange: this.handleNumberChange }),
        _react2.default.createElement(_alert2.default, { type: success ? 'success' : 'error', message: msg })
      );
    }
  }]);

  return IpInput;
}(_react2.default.Component);

exports.default = IpInput;