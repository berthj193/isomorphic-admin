import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { connect } from 'react-redux';

const demoNotifications = [
  {
    id: 1,
    name: 'David Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
  },
  {
    id: 2,
    name: 'Navis Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
  },
  {
    id: 3,
    name: 'Emanual Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
  },
  {
    id: 4,
    name: 'Dowain Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
  },
];

class TopbarNotification extends Component {
  static propTypes = {
    customizedTheme: PropTypes.shape({
      textColor: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }
  render() {
    const { customizedTheme: { textColor } } = this.props;
    const content = (
      <div className="isoDropdownWrapper topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            Notification
          </h3>
        </div>
        <div className="isoDropdownBody">
          {demoNotifications.map(notification => (
            <a className="isoDropdownListItem" key={notification.id}>
              <h5>{notification.name}</h5>
              <p>{notification.notification}</p>
            </a>
          ))}
        </div>
        <a className="isoViewAllBtn">
          View All
        </a>
      </div>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: textColor }}
          />
          <span>{demoNotifications.length}</span>
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
}))(TopbarNotification);
