import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './boxTitle.scss';

export default class StyledBoxTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };

  render() {
    const { title, subtitle } = this.props;
    return (
      <React.Fragment>
        {title
          && <h3 className="box-title isoBoxTitle">
            {` ${title} `}
          </h3>
        }
        {subtitle
          && <p className="box-subtitle isoBoxSubTitle">
            {` ${subtitle} `}
          </p>
        }
      </React.Fragment>
    );
  }
}
