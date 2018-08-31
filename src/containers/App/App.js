import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { logout } from '../../actions/auth';
import { toggleAll } from '../../actions/app';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import Message from '../Message';
import AppRouter from './AppRouter';
import { siteConfig } from '../../settings';

import '../../styles/common.scss';
import '../../styles/global.scss';

const { Content, Footer } = Layout;
export class App extends Component {
  static propTypes = {
    height: PropTypes.number,
    match: PropTypes.shape({
      url: PropTypes.string,
    }),
    toggleAll: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    autoBind(this);
  }

  windowResized(windowSize) {
    this.props.toggleAll(
      windowSize.windowWidth,
      windowSize.windowHeight
    );
  }

  render() {
    const { url } = this.props.match;
    const { height } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Message />
        <Debounce time="1000" handler="onResize">
          <WindowResizeListener
            onResize={this.windowResized}
          />
        </Debounce>
        <Topbar url={url} />
        <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar url={url} />
          <Layout
            className="isoContentMainLayout"
            style={{
              height,
            }}
          >
            <Content className="isomorphicContent">
              <AppRouter url={url} />
            </Content>
            <Footer className="isomorphicFooter">
              {siteConfig.footerText}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    height: state.App.height,
  }),
  { logout, toggleAll }
)(App);
