
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import autoBind from 'react-autobind';
import options from './options';
import Scrollbars from '../../components/utility/customScrollBar';
import Menu from '../../components/uielements/menu';
import {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} from '../../actions/app';
import Logo from '../../components/utility/logo';
import { views } from '../../constants';
import Icon from '../../components/uielements/icon';

import './sidebar.scss';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const { mobileView } = views;

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
class Sidebar extends Component {
  static propTypes = {
    toggleCollapsed: PropTypes.func.isRequired,
    changeCurrent: PropTypes.func.isRequired,
    changeOpenKeys: PropTypes.func.isRequired,
    toggleOpenDrawer: PropTypes.func.isRequired,
    app: PropTypes.shape({
      view: PropTypes.string,
    }),
    url: PropTypes.string,
    height: PropTypes.number,
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === mobileView) {
      this.props.toggleCollapsed();
      this.props.toggleOpenDrawer();
    }
  }

  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }

  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const { key, label, leftIcon, children } = singleOption;
    const url = stripTrailingSlash(this.props.url);
    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder" style={submenuColor}>
              <Icon type={leftIcon} />
              <span className="nav-text">
                {label}
              </span>
            </span>
          }
        >
          {children.map(child => {
            const linkTo = child.withoutDashboard
              ? `/${child.key}`
              : `${url}/${child.key}`;
            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <Link style={submenuColor} to={linkTo}>
                  {child.label}
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key}>
        <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <Icon type={leftIcon} />
            <span className="nav-text">
              {label}
            </span>
          </span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    const { app, toggleOpenDrawer, height } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = () => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Logo collapsed={collapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            onClick={this.handleClick}
            theme="dark"
            className="isoDashboardMenu"
            mode={mode}
            openKeys={collapsed ? [] : app.openKeys}
            selectedKeys={app.current}
            onOpenChange={this.onOpenChange}
          >
            {options.map(singleOption =>
              this.getMenuItem({ singleOption })
            )}
          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

export default connect(
  state => ({
    app: state.App,
    height: state.App.height,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
