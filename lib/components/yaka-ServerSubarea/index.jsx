import React from 'react'
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
  Select,
  Icon,
  Tooltip,
  Alert
} from 'igroot'
import './index.css'

export default class SelectGroup extends React.Component {
  state = {
    hostCheckedKeys: [],
    groups: [],
    apps: [],
    dataSource: {},
    appSelectKey: 0,
    indeterminate: false,
    checkAll: false
  }

  // 增加新分组
  insertGroup = () => {
    const { dataSource } = this.state
    dataSource.haveModule.push({
      id: dataSource.haveModule.length + 1,
      name: `新增分组 - ${dataSource.haveModule.filter(v => v.type === 'new').length + 1}`,
      type: 'new',
      apps: [],
      hosts: []
    })
    this.setState({ dataSource }, () => {
      this.handleSubmit()
    })
  }

  // 原始组内多选框点击事件
  ipsOnCheck = checkedKeys => {
    const { noModule } = this.state.dataSource
    this.setState({
      hostCheckedKeys: checkedKeys,
      indeterminate: !!checkedKeys.length && checkedKeys.length < noModule.length,
      checkAll: checkedKeys.length === noModule.length
    })
  }

  // 移动到分组响应事件
  menuOnClick = ({ key }) => {
    const { hostCheckedKeys, dataSource, groups } = this.state
    if (!hostCheckedKeys || hostCheckedKeys.length === 0) {
      return message.error('没有选择任何节点')
    }

    const noModule = JSON.parse(JSON.stringify(dataSource.noModule))

    hostCheckedKeys.forEach(item => {
      let group = dataSource.haveModule.find(v => v.id === Number(key))
      const hostIndex = noModule.findIndex(v => v === item)
      if (group) {
        group.hosts.push(item)
      } else {
        group = groups.find(v => v.id === Number(key))
        if (group.hosts) {
          group.hosts.push(item)
        } else {
          group.hosts = [item]
        }
      }
      noModule.splice(hostIndex, 1)
    })

    dataSource.noModule = noModule

    this.setState(
      {
        dataSource: dataSource,
        hostCheckedKeys: [],
        indeterminate: false,
        checkAll: false
      },
      () => {
        this.handleSubmit()
      }
    )
  }

  // 分组内的标签移除
  removeTag = (groupId, hostName) => {
    const { dataSource } = this.state
    if (!dataSource.haveModule) {
      dataSource.haveModule = []
    }
    for(const group of dataSource.haveModule) {
      if (group.id === groupId) {
        const hostIndex = group.hosts.findIndex(v => v === hostName)
        group.hosts.splice(hostIndex, 1)
        break
      }
    }
    if (!dataSource.noModule) {
      dataSource.noModule = []
    }
    dataSource.noModule.push(hostName)
    this.setState({ dataSource, hostCheckedKeys: [] }, () => {
      this.handleSubmit()
    })
  }

  // 新增组选择app
  choseAppSelect = (value, groupId) => {
    const { dataSource } = this.state

    for(const group of dataSource.haveModule) {
      if (group.id === groupId) {
        group.apps = []
        value.forEach(item => {
          group.apps.push({
            id: item.key,
            name: item.label
          })
        })
        message.success('添加app成功')
        return this.setState({ dataSource: dataSource }, () => {
          this.handleSubmit()
        })
      }
    }
  }

  // 移除新增的组
  removeNewGroup = groupId => {
    const { dataSource } = this.state
    let groupIndex = 0
    const groupItem = dataSource.haveModule.find((v, index) => {
      if (v.id === groupId) {
        groupIndex = index
        return v
      }
    })
    if (groupItem.hosts.length !== 0) {
      dataSource.noModule = dataSource.noModule.concat(groupItem.hosts)
    }
    dataSource.haveModule.splice(groupIndex, 1)
    this.setState({ dataSource }, () => {
      this.handleSubmit()
    })
  }

  // 清空组内所有服务器
  clearGroupHosts = (type, id) => {
    const { groups, dataSource } = this.state
    if (type === 'existing') {
      for(const group of groups) {
        if (group.id === id && group.hosts && group.hosts.length !== 0) {
          dataSource.noModule.push(...group.hosts)
          group.hosts = []
          return this.setState({ groups: groups, dataSource })
        }
      }
    }

    if (!dataSource.noModule) {
      dataSource.noModule = []
    }
    if (!dataSource.haveModule) {
      dataSource.haveModule = []
    }

    for(const group of dataSource.haveModule) {
      if (group.id === id && group.hosts && group.hosts.length !== 0) {
        dataSource.noModule.push(...group.hosts)
        group.hosts = []
        return this.setState({ dataSource }, () => {
          this.handleSubmit()
        })
      }
    }
  }

  // 全选按钮点击事件
  onCheckAllChange = e => {
    const { noModule } = this.state.dataSource
    this.setState({
      hostCheckedKeys: e.target.checked ? noModule : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  // 提交事件
  handleSubmit = () => {
    const { dataSource, groups, nodeId } = this.state

    if (dataSource.haveModule.some(v => !v.apps || v.apps.length === 0)) {
      return message.warn('存在没有选择app的新建组')
    }
    const params = {}
    params.node_id = nodeId
    params.new_group = []
    params.old_group = {}

    dataSource.haveModule.forEach(item => {
      if (item.hosts && item.hosts.length !== 0) {
        const group = {
          apps: [],
          hosts: [...item.hosts]
        }
        item.apps.forEach(app => {
          group.apps.push(app.id)
        })
        params.new_group.push(group)
      }
    })

    groups.forEach(item => {
      if (item.hosts && item.hosts.length !== 0) {
        params.old_group[item.ename] = [...item.hosts]
      }
    })

    params.extra_render = {
      dataSource: dataSource,
      apps: this.state.apps,
      groups: this.state.groups,
      nodeId: this.state.nodeId
    }

    console.log(`%c服务器预分组组件提交数据详情`, 'color:#2f54eb')
    console.log(params)

    this.props.onChange(params)
  }

  // 数据流转换
  transportDataSource = data => {
    const haveModule = []
    data.have_module.forEach((item, index) => {
      haveModule.push({
        id: index + 1,
        name: `预分组 - ${index + 1}`,
        apps: item.apps,
        hosts: item.hosts || [],
        type: 'advance'
      })
    })
    const noModule = data.no_module
    return { haveModule, noModule }
  }

  // 原有分组数据流转换
  transportGroup = data => {
    const groups = []
    data.forEach(item => {
      groups.push({
        id: Number(item.id),
        name: item.name,
        ename: item.ename,
        hosts: item.hosts ? item.hosts : [],
        apps: item.apps ? item.apps : [],
        existing: 'existing'
      })
    })
    return groups
  }

  // 固定app数据流转换
  transportApp = data => {
    const apps = []
    data.forEach(item => {
      apps.push({
        id: Number(item.id),
        name: item.name
      })
    })
    return apps
  }

  componentDidMount() {
    console.log(this.porps)
    console.log('%cDidMount', 'color:#1890FF')
    console.log(`%c${JSON.stringify(this.props.value)}`, 'color:#F5222D')
    if (this.props.value) {
      if (this.props.value.extra_render) {
        const { dataSource, groups, apps, nodeId } = this.props.value.extra_render
        this.setState({
          nodeId: nodeId ? nodeId : 0,
          dataSource: dataSource ? dataSource : {},
          groups: groups ? groups : [],
          apps: apps ? apps : []
        })
      } else if (this.props.value.dividing_group && !this.props.extra_render) {
        this.setState(
          {
            dataSource: this.transportDataSource(this.props.value.dividing_group),
            apps: this.transportApp(this.props.value.app_list),
            groups: this.transportGroup(this.props.value.existing_group),
            nodeId: this.props.value.node_id
          },
          () => {
            this.handleSubmit()
          }
        )
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('%cReceiveProps', 'color:#1890FF')
    console.log(`%c${JSON.stringify(nextProps.value)}`, 'color:#F5222D')
    if (this.props.value) {
      if (nextProps.value.extra_render) {
        const { dataSource, groups, apps, nodeId } = nextProps.value.extra_render
        this.setState({
          nodeId: nodeId ? nodeId : 0,
          dataSource: dataSource ? dataSource : {},
          groups: groups ? groups : [],
          apps: apps ? apps : []
        })
      } else if (nextProps.value.dividing_group && !nextProps.extra_render) {
        this.setState(
          {
            dataSource: this.transportDataSource(nextProps.value.dividing_group),
            apps: this.transportApp(nextProps.value.app_list),
            groups: this.transportGroup(nextProps.value.existing_group),
            nodeId: nextProps.value.node_id
          },
          () => {
            this.handleSubmit()
          }
        )
      }
    }
  }

  oldGroupAppRender = item => [
    <span className="action-text" onClick={() => this.clearGroupHosts('existing', item.id)}>
      清空
    </span>,
    <Divider type="vertical" />,
    <Popover
      overlayClassName="popover-style"
      content={<div>{item.apps && item.apps.map(app => <p key={app.id}>{app.name}</p>)}</div>}
    >
      <span className="action-text">app</span>
    </Popover>
  ]

  newGroupAppRender = item => [
    <span className="action-text" onClick={() => this.clearGroupHosts(null, item.id)}>
      清空
    </span>,
    <Divider type="vertical" />,
    <Popover
      trigger="click"
      content={
        <Row style={{ width: 150 }}>
          <Col span={24}>
            <Select
              mode="multiple"
              style={{ width: '100%', marginBottom: 10 }}
              showSearch={true}
              allowClear={true}
              labelInValue={true}
              defaultValue={
                item.apps
                  ? item.apps.map(v => {
                    return { label: v.name, key: v.id }
                  })
                  : []
              }
              onChange={value => this.choseAppSelect(value, item.id)}
            >
              {this.state.apps.map(app => (
                <Select.Option value={app.id} key={app.id}>
                  {app.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      }
    >
      <span className="action-text">修改app</span>
    </Popover>,
    item.type === 'new' && (
      <Icon type="close" className="remove-icon" onClick={() => this.removeNewGroup(item.id)} />
    )
  ]

  warnTextRender = () => {
    const { dataSource } = this.state
    if (dataSource.haveModule) {
      const haveNoSelectAppCard = dataSource.haveModule.some(v => !v.apps || v.apps.length === 0)
      if (haveNoSelectAppCard) {
        return <Alert type="error" message="存在没有选择app的分组！请注意！" />
      }
    }
    return null
  }

  render() {
    const { haveModule = [], noModule = [] } = this.state.dataSource
    const { hostCheckedKeys, groups, indeterminate, checkAll } = this.state
    const { remark } = this.props

    const rightMouseMenu = (
      <Menu onClick={this.menuOnClick}>
        {haveModule.map(item => (
          <Menu.Item key={item.id}>{item.name}</Menu.Item>
        ))}
        {groups.map(item => (
          <Menu.Item key={item.id}>{item.name}</Menu.Item>
        ))}
      </Menu>
    )

    return [
      <Row gutter={15} className="select-group">
        <Col span={24}>
          <pre className="remark-pre">{remark}</pre>
        </Col>
        <Col span={24}>{this.warnTextRender()}</Col>
        <Col span={24} style={{ marginBottom: 10 }}>
          <Card
            title="服务器列表"
            extra={[
              <Dropdown overlay={rightMouseMenu} trigger={['click']}>
                <span className="action-text">移动</span>
              </Dropdown>,
              <Divider type="vertical" />,
              <span className="action-text" onClick={this.insertGroup.bind(this)}>
                新增分组
              </span>
            ]}
          >
            <div
              style={{
                borderBottom: '1px solid #E9E9E9',
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
              style={{ width: '100%' }}
              value={hostCheckedKeys}
              onChange={this.ipsOnCheck.bind(this)}
            >
              <Row>
                {noModule.map((item, index) => (
                  <Col span={6} key={index}>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={8}>
          {groups.map((item, index) => (
            <Card
              size="small"
              title={<Tooltip title={item.name}>{item.name}</Tooltip>}
              className="group-card"
              key={`group-card-${index}`}
              extra={this.oldGroupAppRender(item)}
            >
              {Array.isArray(item.hosts) &&
              item.hosts.map((host, index) => (
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
          ))}
        </Col>
        <Col span={8}>
          {haveModule.map((item, index) => {
            if (item.type === 'advance') {
              return (
                <Card
                  size="small"
                  title={item.name}
                  className="group-card"
                  key={`group-card-${index}`}
                  extra={this.newGroupAppRender(item)}
                >
                  {Array.isArray(item.hosts) && item.hosts.map((host, index) => (
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
              )
            }
          })}
        </Col>
        <Col span={8}>
          {haveModule.map((item, index) => {
            if (item.type === 'new') {
              return (
                <Card
                  size="small"
                  title={item.name}
                  className="group-card"
                  key={`group-card-${index}`}
                  extra={this.newGroupAppRender(item)}
                >
                  {Array.isArray(item.hosts) && item.hosts.map((host, index) => (
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
              )
            }
          })}
        </Col>
      </Row>
    ]
  }
}

SelectGroup.defaultProps = {
  value: {},
  remark: 'asdasdasd',
  onChange: () => {}
}
