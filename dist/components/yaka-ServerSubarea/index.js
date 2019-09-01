"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require("igroot/lib/tag");

var _tag2 = _interopRequireDefault(_tag);

var _tooltip = require("igroot/lib/tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _card = require("igroot/lib/card");

var _card2 = _interopRequireDefault(_card);

var _checkbox = require("igroot/lib/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _dropdown = require("igroot/lib/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _menu = require("igroot/lib/menu");

var _menu2 = _interopRequireDefault(_menu);

var _icon = require("igroot/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _row = require("igroot/lib/row");

var _row2 = _interopRequireDefault(_row);

var _col = require("igroot/lib/col");

var _col2 = _interopRequireDefault(_col);

var _select = require("igroot/lib/select");

var _select2 = _interopRequireDefault(_select);

var _popover = require("igroot/lib/popover");

var _popover2 = _interopRequireDefault(_popover);

var _divider = require("igroot/lib/divider");

var _divider2 = _interopRequireDefault(_divider);

var _message2 = require("igroot/lib/message");

var _message3 = _interopRequireDefault(_message2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("igroot/lib/tag/style");

require("igroot/lib/tooltip/style");

require("igroot/lib/card/style");

require("igroot/lib/checkbox/style");

require("igroot/lib/dropdown/style");

require("igroot/lib/menu/style");

require("igroot/lib/icon/style");

require("igroot/lib/row/style");

require("igroot/lib/col/style");

require("igroot/lib/select/style");

require("igroot/lib/popover/style");

require("igroot/lib/divider/style");

require("igroot/lib/message/style");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectGroup = function (_React$Component) {
  _inherits(SelectGroup, _React$Component);

  function SelectGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectGroup.__proto__ || Object.getPrototypeOf(SelectGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hostCheckedKeys: [],
      groups: [],
      dataSource: {},
      appSelectKey: 0,
      indeterminate: false,
      checkAll: false
    }, _this.insertGroup = function () {
      var dataSource = _this.state.dataSource;

      dataSource.haveModule.push({
        id: dataSource.haveModule.length + 1,
        name: "\u65B0\u589E\u5206\u7EC4 - " + (dataSource.haveModule.filter(function (v) {
          return v.type === "new";
        }).length + 1),
        type: "new",
        apps: [],
        hosts: []
      });
      _this.setState({ dataSource: dataSource });
    }, _this.ipsOnCheck = function (checkedKeys) {
      var noModule = _this.state.dataSource.noModule;

      _this.setState({
        hostCheckedKeys: checkedKeys,
        indeterminate: !!checkedKeys.length && checkedKeys.length < noModule.length,
        checkAll: checkedKeys.length === noModule.length
      });
    }, _this.menuOnClick = function (_ref2) {
      var key = _ref2.key;
      var _this$state = _this.state,
          hostCheckedKeys = _this$state.hostCheckedKeys,
          dataSource = _this$state.dataSource,
          groups = _this$state.groups;

      if (!hostCheckedKeys || hostCheckedKeys.length === 0) {
        return _message3.default.error("没有选择任何节点");
      }

      var noModule = JSON.parse(JSON.stringify(dataSource.noModule));

      hostCheckedKeys.forEach(function (item) {
        var group = dataSource.haveModule.find(function (v) {
          return v.id === Number(key);
        });
        var hostIndex = noModule.findIndex(function (v) {
          return v === item;
        });
        if (group) {
          group.hosts.push(item);
        } else {
          group = groups.find(function (v) {
            return v.id === Number(key);
          });
          if (group.hosts) {
            group.hosts.push(item);
          } else {
            group.hosts = [item];
          }
        }
        noModule.splice(hostIndex, 1);
      });

      dataSource.noModule = noModule;

      _this.setState({
        dataSource: dataSource,
        hostCheckedKeys: [],
        indeterminate: false,
        checkAll: false
      });
    }, _this.removeTag = function (groupId, hostName) {
      var dataSource = _this.state.dataSource;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dataSource.haveModule[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;

          if (group.id === groupId) {
            var hostIndex = group.hosts.findIndex(function (v) {
              return v === hostName;
            });
            group.hosts.splice(hostIndex, 1);
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      dataSource.noModule.push(hostName);
      _this.setState({ dataSource: dataSource, hostCheckedKeys: [] });
    }, _this.choseAppSelect = function (value, groupId) {
      var dataSource = _this.state.dataSource;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {

        for (var _iterator2 = dataSource.haveModule[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var group = _step2.value;

          if (group.id === groupId) {
            group.apps.push(value);
            _message3.default.success("添加app成功");
            return _this.setState({ dataSource: dataSource });
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }, _this.removeNewGroup = function (groupId) {
      var dataSource = _this.state.dataSource;

      var groupIndex = 0;
      var groupItem = dataSource.haveModule.find(function (v, index) {
        if (v.id === groupId) {
          groupIndex = index;
          return v;
        }
      });
      if (groupItem.hosts.length !== 0) {
        dataSource.noModule = dataSource.noModule.concat(groupItem.hosts);
      }
      dataSource.haveModule.splice(groupIndex, 1);
      _this.setState({ dataSource: dataSource });
    }, _this.clearGroupHosts = function (type, id) {
      var _this$state2 = _this.state,
          groups = _this$state2.groups,
          dataSource = _this$state2.dataSource;

      if (type === "existing") {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = groups[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var group = _step3.value;

            if (group.id === id && group.hosts && group.hosts.length !== 0) {
              var _dataSource$noModule;

              (_dataSource$noModule = dataSource.noModule).push.apply(_dataSource$noModule, _toConsumableArray(group.hosts));
              group.hosts = [];
              return _this.setState({ groups: groups, dataSource: dataSource });
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = dataSource.haveModule[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _group = _step4.value;

          if (_group.id === id && _group.hosts && _group.hosts.length !== 0) {
            var _dataSource$noModule2;

            (_dataSource$noModule2 = dataSource.noModule).push.apply(_dataSource$noModule2, _toConsumableArray(_group.hosts));
            _group.hosts = [];
            _this.setState({ dataSource: dataSource });
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }, _this.onCheckAllChange = function (e) {
      var noModule = _this.state.dataSource.noModule;

      _this.setState({
        hostCheckedKeys: e.target.checked ? noModule : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }, _this.handleSubmit = function () {
      var _this$state3 = _this.state,
          dataSource = _this$state3.dataSource,
          groups = _this$state3.groups;
      var _this$props = _this.props,
          nodeId = _this$props.nodeId,
          type = _this$props.type;


      if (type === "cache") {
        if (dataSource.haveModule.some(function (v) {
          return !v.apps || v.apps.length === 0;
        })) {
          return _message3.default.error("存在没有选择app的新建组");
        }
      }

      var params = {};
      params.node_id = nodeId;
      params.new_group = [];
      params.old_group = {};

      dataSource.haveModule.forEach(function (item) {

        if (item.hosts && item.hosts.length !== 0) {
          var group = {
            apps: [],
            hosts: [].concat(_toConsumableArray(item.hosts))
          };
          item.apps.forEach(function (app) {
            group.apps.push(app.id);
          });
          params.new_group.push(group);
        }
      });

      groups.forEach(function (item) {
        if (item.hosts && item.hosts.length !== 0) {
          params.old_group[item.ename] = [].concat(_toConsumableArray(item.hosts));
        }
      });

      console.log("服务器预分组组件提交数据详情：", params);

      _this.props.onChange(params);
    }, _this.transportDataSource = function (data) {
      var haveModule = [];
      data.have_module.forEach(function (item, index) {
        haveModule.push({
          id: index + 1,
          name: "\u9884\u5206\u7EC4 - " + (index + 1),
          apps: item.apps,
          hosts: item.hosts,
          type: "advance"
        });
      });
      var noModule = data.no_module;
      return { haveModule: haveModule, noModule: noModule };
    }, _this.transportGroup = function (data) {
      var groups = [];
      data.forEach(function (item) {
        groups.push({
          id: Number(item.id),
          name: item.name,
          ename: item.ename,
          hosts: item.hosts ? item.hosts : [],
          apps: item.apps ? item.apps : [],
          existing: "existing"
        });
      });
      return groups;
    }, _this.transportApp = function (data) {
      var apps = [];
      data.forEach(function (item) {
        apps.push({
          id: Number(item.id),
          name: item.name
        });
      });
      return apps;
    }, _this.oldGroupAppRender = function (item) {
      return [_react2.default.createElement(
        "span",
        { className: "action-text", onClick: function onClick() {
            return _this.clearGroupHosts("existing", item.id);
          } },
        "\u6E05\u7A7A"
      ), _react2.default.createElement(_divider2.default, { type: "vertical" }), _react2.default.createElement(
        _popover2.default,
        {
          overlayClassName: "popover-style",
          content: _react2.default.createElement(
            "div",
            null,
            item.apps && item.apps.map(function (app) {
              return _react2.default.createElement(
                "p",
                { key: app.id },
                app.name
              );
            })
          ) },
        _react2.default.createElement(
          "span",
          { className: "action-text" },
          "app"
        )
      )];
    }, _this.newGroupAppRender = function (item) {
      return [_react2.default.createElement(
        "span",
        { className: "action-text", onClick: function onClick() {
            return _this.clearGroupHosts(null, item.id);
          } },
        "\u6E05\u7A7A"
      ), _react2.default.createElement(_divider2.default, { type: "vertical" }), _react2.default.createElement(
        _popover2.default,
        {
          trigger: "click",
          content: _react2.default.createElement(
            _row2.default,
            { style: { width: 150 } },
            _react2.default.createElement(
              _col2.default,
              { span: 24 },
              _react2.default.createElement(
                _select2.default,
                {
                  mode: "multiple",
                  style: { width: "100%", marginBottom: 10 },
                  showSearch: true,
                  allowClear: true,
                  labelInValue: true,
                  defaultValue: item.apps.map(function (v) {
                    return { label: v.name, key: v.id };
                  }),
                  onSelect: function onSelect(value) {
                    return _this.choseAppSelect(value, item.id);
                  }
                },
                _this.state.apps.map(function (app) {
                  return _react2.default.createElement(
                    _select2.default.Option,
                    { value: app.id, key: app.id },
                    app.name
                  );
                })
              )
            )
          )
        },
        _react2.default.createElement(
          "span",
          { className: "action-text" },
          "\u4FEE\u6539app"
        )
      ), item.type === "new" && _react2.default.createElement(_icon2.default, { type: "close", className: "remove-icon", onClick: function onClick() {
          return _this.removeNewGroup(item.id);
        } })];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 增加新分组


  // 原始组内多选框点击事件


  // 移动到分组响应事件


  // 分组内的标签移除


  // 新增组选择app


  // 移除新增的组


  // 清空组内所有服务器


  // 全选按钮点击事件


  // 提交事件


  // 数据流转换


  // 原有分组数据流转换


  // 固定app数据流转换


  _createClass(SelectGroup, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.value) {
        if (this.props.value.dividing_group && !this.state.dataSource.haveModule) {
          this.setState({
            dataSource: this.transportDataSource(this.props.value.dividing_group),
            apps: this.transportApp(this.props.value.app_list),
            groups: this.transportGroup(this.props.value.existing_group)
          });
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (this.props.value) {
        if (nextProps.value.dividing_group && !this.state.dataSource.haveModule) {
          this.setState({
            dataSource: this.transportDataSource(nextProps.value.dividing_group),
            apps: this.transportApp(nextProps.value.app_list),
            groups: this.transportGroup(nextProps.value.existing_group)
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state$dataSource = this.state.dataSource,
          _state$dataSource$hav = _state$dataSource.haveModule,
          haveModule = _state$dataSource$hav === undefined ? [] : _state$dataSource$hav,
          _state$dataSource$noM = _state$dataSource.noModule,
          noModule = _state$dataSource$noM === undefined ? [] : _state$dataSource$noM;
      var _state = this.state,
          hostCheckedKeys = _state.hostCheckedKeys,
          groups = _state.groups,
          indeterminate = _state.indeterminate,
          checkAll = _state.checkAll;
      var _props = this.props,
          type = _props.type,
          remark = _props.remark;

      var rightMouseMenu = _react2.default.createElement(
        _menu2.default,
        { onClick: this.menuOnClick },
        haveModule.map(function (item) {
          return _react2.default.createElement(
            _menu2.default.Item,
            { key: item.id },
            item.name
          );
        }),
        groups.map(function (item) {
          return _react2.default.createElement(
            _menu2.default.Item,
            { key: item.id },
            item.name
          );
        })
      );
      return [_react2.default.createElement(
        _row2.default,
        { gutter: 15, className: "select-group" },
        _react2.default.createElement(
          _col2.default,
          { span: 24 },
          _react2.default.createElement(
            "pre",
            { className: "remark-pre" },
            remark
          )
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 24, style: { marginBottom: 10 } },
          _react2.default.createElement(
            _card2.default,
            {
              title: "\u670D\u52A1\u5668\u5217\u8868",
              extra: [_react2.default.createElement(
                _dropdown2.default,
                { overlay: rightMouseMenu, trigger: ["click"] },
                _react2.default.createElement(
                  "span",
                  { className: "action-text" },
                  "\u79FB\u52A8"
                )
              ), _react2.default.createElement(_divider2.default, { type: "vertical" }), _react2.default.createElement(
                "span",
                { className: "action-text", onClick: this.insertGroup.bind(this) },
                "\u65B0\u589E\u5206\u7EC4"
              ), _react2.default.createElement(_divider2.default, { type: "vertical" }), _react2.default.createElement(
                "span",
                {
                  className: "action-text",
                  style: { color: "#f5222d" },
                  onClick: this.handleSubmit.bind(this)
                },
                "\u4FDD\u5B58"
              )]
            },
            _react2.default.createElement(
              "div",
              {
                style: {
                  borderBottom: "1px solid #E9E9E9",
                  paddingBottom: 5
                }
              },
              _react2.default.createElement(
                _checkbox2.default,
                {
                  indeterminate: indeterminate,
                  onChange: this.onCheckAllChange,
                  checked: checkAll
                },
                "\u5168\u9009"
              )
            ),
            _react2.default.createElement("br", null),
            _react2.default.createElement(
              _checkbox2.default.Group,
              {
                style: { width: "100%" },
                value: hostCheckedKeys,
                onChange: this.ipsOnCheck.bind(this)
              },
              _react2.default.createElement(
                _row2.default,
                null,
                noModule.map(function (item, index) {
                  return _react2.default.createElement(
                    _col2.default,
                    { span: 6, key: index },
                    _react2.default.createElement(
                      _checkbox2.default,
                      { value: item },
                      item
                    )
                  );
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 8 },
          groups.map(function (item, index) {
            return _react2.default.createElement(
              _card2.default,
              {
                size: "small",
                title: _react2.default.createElement(
                  _tooltip2.default,
                  { title: item.name },
                  item.name
                ),
                className: "group-card",
                key: "group-card-" + index,
                extra: type === "cache" && _this2.oldGroupAppRender(item)
              },
              item.hosts && item.hosts.map(function (host, index) {
                return _react2.default.createElement(
                  _tag2.default,
                  {
                    className: "group-tag",
                    key: item.name + "-" + host + "-" + index,
                    closable: true,
                    onClose: function onClose() {
                      return _this2.removeTag(item.id, host);
                    }
                  },
                  host
                );
              })
            );
          })
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 8 },
          haveModule.map(function (item, index) {
            if (item.type === "advance") {
              return _react2.default.createElement(
                _card2.default,
                {
                  size: "small",
                  title: item.name,
                  className: "group-card",
                  key: "group-card-" + index,
                  extra: type === "cache" && _this2.newGroupAppRender(item)
                },
                item.hosts.map(function (host, index) {
                  return _react2.default.createElement(
                    _tag2.default,
                    {
                      className: "group-tag",
                      key: item.name + "-" + host + "-" + index,
                      closable: true,
                      onClose: function onClose() {
                        return _this2.removeTag(item.id, host);
                      }
                    },
                    host
                  );
                })
              );
            }
          })
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 8 },
          haveModule.map(function (item, index) {
            if (item.type === "new") {
              return _react2.default.createElement(
                _card2.default,
                {
                  size: "small",
                  title: item.name,
                  className: "group-card",
                  key: "group-card-" + index,
                  extra: type === "cache" && _this2.newGroupAppRender(item)
                },
                item.hosts.map(function (host, index) {
                  return _react2.default.createElement(
                    _tag2.default,
                    {
                      className: "group-tag",
                      key: item.name + "-" + host + "-" + index,
                      closable: true,
                      onClose: function onClose() {
                        return _this2.removeTag(item.id, host);
                      }
                    },
                    host
                  );
                })
              );
            }
          })
        )
      )];
    }
  }]);

  return SelectGroup;
}(_react2.default.Component);

exports.default = SelectGroup;


SelectGroup.defaultProps = {
  value: {},
  nodeId: 0,
  type: "cache",
  remark: "",
  onChange: function onChange() {}
};