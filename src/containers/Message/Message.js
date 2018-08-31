import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

class Message extends React.Component {
  static propTypes = {
    Message: PropTypes.shape({
      content: PropTypes.string,
      timestamp: PropTypes.number,
      type: PropTypes.string,
    }),
  };

  componentDidUpdate({ Message: { timestamp: prevTimestamp } }) {
    const { Message: { content, type, timestamp } } = this.props;
    if (content && type && timestamp !== prevTimestamp) {
      message[type](content);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  ({ Message }) => ({
    Message,
  }),
)(Message);
