import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Modal from '../../components/feedback/modal';
import { InputSearch } from '../../components/uielements/input';
import './topbarSearchModal.scss';

class Searchbar extends Component {
  static propTypes = {
    onBlur: PropTypes.func,
  };

  componentDidMount() {
    try {
      document.getElementById('InputTopbarSearch').focus();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <InputSearch
        id="InputTopbarSearch"
        size="large"
        placeholder="Enter search text"
        onBlur={this.props.onBlur}
      />
    );
  }
}

class TopbarSearch extends Component {
  static propTypes = {
    customizedTheme: PropTypes.shape({
      textColor: PropTypes.string,
    }),
  };

  constructor() {
    super();
    autoBind(this);
    this.state = {
      visiblity: false,
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 200);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { customizedTheme: { textColor } } = this.props;
    const { visible } = this.state;
    return (
      <div onClick={this.showModal}>
        <i
          className="ion-ios-search-strong"
          style={{ color: textColor }}
        />
        <Modal
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          wrapClassName="isoSearchModal"
          width="60%"
          footer={null}
        >
          <div className="isoSearchContainer">
            {visible ? <Searchbar onBlur={this.handleBlur} /> : ''}
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
}))(TopbarSearch);
