'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
  var _ref$src = _ref.src,
      src = _ref$src === undefined ? '' : _ref$src,
      width = _ref.width,
      height = _ref.height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      children = _ref.children,
      othProps = _objectWithoutProperties(_ref, ['src', 'width', 'height', 'style', 'children']);

  var realStyle = {
    width: width || '100%',
    height: height || '100%'
  };
  return _react2.default.createElement('img', _extends({ style: realStyle }, othProps, { width: '100%', height: '100%', src: src }));
};