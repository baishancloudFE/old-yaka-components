import React from "react";
import {
  Row,
  Col,
  Checkbox,
  Tag,
  Card,
  Menu,
  Dropdown,
  message,
  Divider,
  Popover,
  Select, Icon, Tooltip
} from "igroot";
import PropTypes from "prop-types";
import "./index.css";

export default class SelectGroup extends React.Component {

  state = {
    hostCheckedKeys: [],
    groups: [],
    dataSource: {},
    appSelectKey: 0,
    indeterminate: false,
    checkAll: false,
  };

  // 增加新分组
  insertGroup = () => {
    const { dataSource } = this.state;
    dataSource.haveModule.push({
      id: dataSource.haveModule.length + 1,
      name: `新增分组 - ${dataSource.haveModule.filter(v => v.type === "new").length + 1}`,
      type: "new",
      apps: [],
      hosts: [],
    });
    this.setState({ dataSource });
  };

  // 原始组内多选框点击事件
  ipsOnCheck = (checkedKeys) => {
    const { noModule } = this.state.dataSource;
    this.setState({
      hostCheckedKeys: checkedKeys,
      indeterminate: !!checkedKeys.length && checkedKeys.length < noModule.length,
      checkAll: checkedKeys.length === noModule.length,
    });
  };

  // 移动到分组响应事件
  menuOnClick = ({ key }) => {
    const { hostCheckedKeys, dataSource, groups } = this.state;
    console.log(hostCheckedKeys);
    if (!hostCheckedKeys || hostCheckedKeys.length === 0) {
      return message.error("没有选择任何节点");
    }

    const noModule = JSON.parse(JSON.stringify(dataSource.noModule));

    hostCheckedKeys.forEach((item) => {
      let group = dataSource.haveModule.find(v => v.id === Number(key));
      const hostIndex = noModule.findIndex((v) => v === item);
      if (group) {
        group.hosts.push(item);
      } else {
        group = groups.find(v => v.id === Number(key));
        if (group.hosts) {
          group.hosts.push(item);
        } else {
          group.hosts = [item];
        }
      }
      noModule.splice(hostIndex, 1);
    });

    dataSource.noModule = noModule;

    this.setState({
      dataSource: dataSource,
      hostCheckedKeys: [],
      indeterminate: false,
      checkAll: false,
    });
  };

  // 分组内的标签移除
  removeTag = (groupId, hostName) => {
    const { dataSource } = this.state;
    for(const group of dataSource.haveModule) {
      if (group.id === groupId) {
        const hostIndex = group.hosts.findIndex(v => v === hostName);
        group.hosts.splice(hostIndex, 1);
        break;
      }
    }
    dataSource.noModule.push(hostName);
    this.setState({ dataSource, hostCheckedKeys: [] });
  };

  // 新增组选择app
  choseAppSelect = (value, groupId) => {
    const { dataSource } = this.state;

    for(const group of dataSource.haveModule) {
      if (group.id === groupId) {
        group.apps.push(value);
        message.success("添加app成功");
        return this.setState({ dataSource: dataSource });
      }
    }
  };

  // 移除新增的组
  removeNewGroup = (groupId) => {
    const { dataSource } = this.state;
    let groupIndex = 0;
    const groupItem = dataSource.haveModule.find((v, index) => {
      if (v.id === groupId) {
        groupIndex = index;
        return v;
      }
    });
    if (groupItem.hosts.length !== 0) {
      dataSource.noModule = dataSource.noModule.concat(groupItem.hosts);
    }
    dataSource.haveModule.splice(groupIndex, 1);
    this.setState({ dataSource });
  };

  // 清空组内所有服务器
  clearGroupHosts = (type, id) => {
    const { groups, dataSource } = this.state;
    if (type === "existing") {
      for(const group of groups) {
        if (group.id === id && group.hosts && group.hosts.length !== 0) {
          dataSource.noModule.push(...group.hosts);
          group.hosts = [];
          return this.setState({ groups: groups, dataSource });
        }
      }
    }

    for(const group of dataSource.haveModule) {
      if (group.id === id && group.hosts && group.hosts.length !== 0) {
        dataSource.noModule.push(...group.hosts);
        group.hosts = [];
        this.setState({ dataSource });
      }
    }

  };

  // 全选按钮点击事件
  onCheckAllChange = e => {
    const { noModule } = this.state.dataSource;
    this.setState({
      hostCheckedKeys: e.target.checked ? noModule : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  // 提交事件
  handleSubmit = () => {
    const { dataSource, groups } = this.state;
    const { nodeId, type } = this.props;

    if (type === "cache") {
      if (dataSource.haveModule.some(v => !v.apps || v.apps.length === 0)) {
        return message.error("存在没有选择app的新建组");
      }
    }

    const params = {};
    params.node_id = nodeId;
    params.new_group = [];
    params.old_group = {};


    dataSource.haveModule.forEach((item) => {

      if (item.hosts && item.hosts.length !== 0) {
        const group = {
          apps: [],
          hosts: [...item.hosts],
        };
        item.apps.forEach((app) => {
          group.apps.push(app.id);
        });
        params.new_group.push(group);
      }
    });

    groups.forEach((item) => {
      if (item.hosts) {
        params.old_group[item.name] = [...item.hosts];
      }
    });

    console.log("服务器预分组组件提交数据详情：", params);

    this.props.onChange(params);
  };

  // 数据流转换
  transportDataSource = (data) => {
    const haveModule = [];
    data.have_module.forEach((item, index) => {
      haveModule.push({
        id: index + 1,
        name: `预分组 - ${index + 1}`,
        apps: item.apps,
        hosts: item.hosts,
        type: "advance"
      });
    });
    const noModule = data.no_module;
    console.log({ haveModule, noModule });
    return { haveModule, noModule };
  };

  // 原有分组数据流转换
  transportGroup = (data) => {
    const groups = [];
    data.forEach((item) => {
      groups.push({
        id: Number(item.id),
        name: item.name,
        hosts: item.hosts ? item.hosts : [],
        apps: item.apps ? item.apps : [],
        existing: "existing"
      });
    });
    return groups;
  };

  // 固定app数据流转换
  transportApp = (data) => {
    const apps = [];
    data.forEach((item) => {
      apps.push({
        id: Number(item.id),
        name: item.name,
      });
    });
    return apps;
  };

  componentDidMount() {
    if (this.props.value.dividing_group && !this.state.dataSource.haveModule) {
      this.setState({
        dataSource: this.transportDataSource(this.props.value.dividing_group),
        apps: this.transportApp(this.props.value.app_list),
        groups: this.transportGroup(this.props.value.existing_group),
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value.dividing_group && !this.state.dataSource.haveModule) {
      this.setState({
        dataSource: this.transportDataSource(prevProps.value.dividing_group),
        apps: this.transportApp(prevProps.value.app_list),
        groups: this.transportGroup(prevProps.value.existing_group),
      });
    }
  }

  oldGroupAppRender = (item) => [
    <span className="action-text" onClick={() => this.clearGroupHosts("existing", item.id)}>清空</span>,
    <Divider type="vertical" />,
    <Popover
      overlayClassName="popover-style"
      content={
        <div>
          {
            item.apps && item.apps.map((app) => (
              <p key={app.id}>{app.name}</p>
            ))
          }
        </div>
      }>
      <span className="action-text">app</span>
    </Popover>
  ];

  newGroupAppRender = (item) => ([
    <span className="action-text" onClick={() => this.clearGroupHosts(null, item.id)}>清空</span>,
    <Divider type="vertical" />,
    <Popover
      trigger="click"
      content={
        <Row style={{ width: 150 }}>
          <Col span={24}>
            <Select
              mode="multiple"
              style={{ width: "100%", marginBottom: 10 }}
              showSearch={true}
              allowClear={true}
              labelInValue={true}
              defaultValue={item.apps.map(v => {
                return { label: v.name, key: v.id };
              })}
              onSelect={(value) => this.choseAppSelect(value, item.id)}
            >
              {
                this.state.apps.map((app) => (
                  <Select.Option value={app.id} key={app.id}>
                    {app.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Col>
        </Row>
      }
    >
      <span className="action-text">修改app</span>
    </Popover>,
    item.type === "new" && <Icon type="close" className="remove-icon" onClick={() => this.removeNewGroup(item.id)} />
  ]);

  render() {
    const { haveModule = [], noModule = [] } = this.state.dataSource;
    const { hostCheckedKeys, groups, indeterminate, checkAll } = this.state;
    const { type, remark } = this.props;
    const rightMouseMenu = (
      <Menu onClick={this.menuOnClick}>
        {
          haveModule.map((item) => (
            <Menu.Item key={item.id}>
              {item.name}
            </Menu.Item>
          ))
        }
        {
          groups.map((item) => (
            <Menu.Item key={item.id}>
              {item.name}
            </Menu.Item>
          ))
        }
      </Menu>
    );
    return [
      <Row gutter={15} className="select-group">
        <Col span={24}>
          <pre className="remark-pre">
            {remark}
          </pre>
        </Col>
        <Col span={24} style={{ marginBottom: 10 }}>
          <Card
            title='服务器列表'
            extra={
              [
                <Dropdown overlay={rightMouseMenu} trigger={["click"]}>
                  <span className="action-text">移动</span>
                </Dropdown>,
                <Divider type="vertical" />,
                <span className="action-text" onClick={this.insertGroup.bind(this)}>新增分组</span>,
                <Divider type="vertical" />,
                <span
                  className="action-text"
                  style={{ color: "#f5222d" }}
                  onClick={this.handleSubmit.bind(this)}
                >
                  保存
                </span>,
              ]
            }
          >
            <div
              style={{
                borderBottom: "1px solid #E9E9E9",
                paddingBottom: 5
              }}
            >
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
            </div>
            <br />
            <Checkbox.Group
              style={{ width: "100%" }}
              value={hostCheckedKeys}
              onChange={this.ipsOnCheck.bind(this)}
            >
              <Row>
                {
                  noModule.map((item, index) => (
                    <Col span={6} key={index}>
                      <Checkbox value={item}>{item}</Checkbox>
                    </Col>
                  ))
                }
              </Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={8}>
          {
            groups.map((item, index) => (
              <Card
                size='small'
                title={
                  <Tooltip title={item.name}>
                    {item.name}
                  </Tooltip>
                }
                className="group-card"
                key={`group-card-${index}`}
                extra={type === "cache" && this.oldGroupAppRender(item)}
              >
                {item.hosts && item.hosts.map((host, index) => (
                  <Tag
                    className="group-tag"
                    key={`${item.name}-${host}-${index}`}
                    closable={true}
                    onClose={() => this.removeTag(item.id, host)}
                  >
                    {host}
                  </Tag>
                ))}
              </Card>
            ))
          }
        </Col>
        <Col span={8}>
          {
            haveModule.map((item, index) => {
              if (item.type === "advance") {
                return (
                  <Card
                    size='small'
                    title={item.name}
                    className="group-card"
                    key={`group-card-${index}`}
                    extra={type === "cache" && this.newGroupAppRender(item)}
                  >
                    {item.hosts.map((host, index) => (
                      <Tag
                        className="group-tag"
                        key={`${item.name}-${host}-${index}`}
                        closable={true}
                        onClose={() => this.removeTag(item.id, host)}
                      >
                        {host}
                      </Tag>
                    ))}
                  </Card>
                );
              }
            })
          }
        </Col>
        <Col span={8}>
          {
            haveModule.map((item, index) => {
              if (item.type === "new") {
                return (
                  <Card
                    size='small'
                    title={item.name}
                    className="group-card"
                    key={`group-card-${index}`}
                    extra={type === "cache" && this.newGroupAppRender(item)}
                  >
                    {item.hosts.map((host, index) => (
                      <Tag
                        className="group-tag"
                        key={`${item.name}-${host}-${index}`}
                        closable={true}
                        onClose={() => this.removeTag(item.id, host)}
                      >
                        {host}
                      </Tag>
                    ))}
                  </Card>
                );
              }
            })
          }
        </Col>
      </Row>
    ];
  }
}

SelectGroup.propTypes = {
  value: PropTypes.object,
  nodeId: PropTypes.number,
  cache: PropTypes.string,
  onChange: PropTypes.func,
  remark: PropTypes.string,
};

SelectGroup.defaultProps = {
  value: {},
  nodeId: 0,
  type: "cache",
  remark: "",
  onChange: () => {
  },
};