import React from 'react';
import { Input, Alert } from 'igroot';

let timer;

class IpInput extends React.Component {
  state = {
    validate: {
      success: true,
      msg: '检测通过'
    }
  };

  handleNumberChange = e => {
    clearTimeout(timer);

    let { value } = e.target;

    value = value.replace(/[^a-z0-9.:]/g, '').replace(/\s+/g, '');
    if (!value) {
      this.props.onChange(value);
      return this.setState({
        validate: { success: true, msg: '检测通过' }
      });
    }

    this.setState({
      validate: { success: false, msg: '正在检测' }
    });

    timer = setTimeout(() => {
      this.validate(value);
    }, 1000);

    this.props.onChange(value);
  };

  validate(value) {
    clearTimeout(timer);
    const { type = 'ipv4' } = this.props;
    const ipv4Reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    const ipv6Reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

    const isIPv4 = ipv4Reg.test(value);
    const isIPv6 = ipv6Reg.test(value);

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

  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    const { value } = this.props;
    const { success, msg } = this.state.validate;
    return (
      <div>
        <Input value={value} onChange={this.handleNumberChange} />
        <Alert type={success ? 'success' : 'error'} message={msg} />
      </div>
    );
  }
}

export default IpInput;
