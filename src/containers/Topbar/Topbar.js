import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import autoBind from 'react-autobind';
import { toggleCollapsed } from '../../actions/app';
import TopbarUser from './topbarUser';
import DefaultStore from '../../components/topbar/defaultStore';

import './topbar.scss';
import './topbarDropdown.scss';

const { Header } = Layout;

class Topbar extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    openDrawer: PropTypes.bool,
    toggleCollapsed: PropTypes.func,
  };

  constructor() {
    super();
    autoBind(this);
  }

  handleUserClick() {
    this.setState({ selectedItem: 'user' });
  }

  render() {
    const { toggleCollapsed } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    return (
      <Header
        className={
          collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            onClick={toggleCollapsed}
          />
          <DefaultStore />
        </div>

        <ul className="isoRight">
          <li
            onClick={this.handleUserClick}
            className="isoUser"
          >
            <TopbarUser />
          </li>
        </ul>
      </Header>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
  }),
  { toggleCollapsed }
)(Topbar);
