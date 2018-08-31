import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './styles/modal.scss';

class ModalElement extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    return (
      <Modal
        title={this.props.title}
        width="80%"
        visible={this.props.visible || true}
        footer={null}
        destroyOnClose
        {...this.props}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default ModalElement;
