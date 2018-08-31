import React, { Component } from 'react';
import Loader from '../../components/utility/loader';

class PageLoading extends Component {
  render() {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }
}

export default PageLoading;
