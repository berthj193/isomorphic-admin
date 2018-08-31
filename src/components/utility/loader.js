import React, { PureComponent } from 'react';
import './loader.scss';

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="loader">
        <svg className="isoContentLoader" viewBox="0 0 50 50">
          <circle
            className="isoContentLoaderCircle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="3.6"
          />
        </svg>
      </div>
    );
  }
}
