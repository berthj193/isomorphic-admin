import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';

export default class Logo extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
  };

  render() {
    const { collapsed } = this.props;
    const { siteIcon, siteName } = siteConfig;
    return (
      <div className="isoLogoWrapper">
        {collapsed ? (
          <div>
            <h3>
              <Link to="/dashboard">
                <i className={siteIcon} />
              </Link>
            </h3>
          </div>
        ) : (
          <h3>
            <Link to="/dashboard">{siteName}</Link>
          </h3>
        )}
      </div>
    );
  }
}
