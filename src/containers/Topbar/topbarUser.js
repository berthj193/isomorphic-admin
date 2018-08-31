import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Popover from '../../components/uielements/popover';
import { logout } from '../../actions/auth';

class TopbarUser extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    avatar: PropTypes.string,
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
    // TODO investigate content field
    const content = (
      <div className="isoDropdownWrapper isoUserDropdown">
        <a className="isoDropdownLink">
          {'Settings'}
        </a>
        <a className="isoDropdownLink">
          {'Feedback'}
        </a>
        <a className="isoDropdownLink">
          {'Help'}
        </a>
        <a className="isoDropdownLink" onClick={this.props.logout}>
          {'Logout'}
        </a>
      </div>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={this.props.avatar} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(
  state => ({
    avatar: get(state.Auth, 'profile.picture'),
  }),
  { logout }
)(TopbarUser);
