import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import Error from '../../components/error/error';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../uielements/buttonList';

export class ItemList extends Component {
  static propTypes = {
    history: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      key: PropTypes.string,
    })),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    })),
    filterComponent: PropTypes.node,
    detailsPath: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onRow(record) {
    return {
      onClick: () => {
        const { push, location: { pathname } } = this.props.history;
        if (typeof this.props.detailsPath === 'function') {
          push(this.props.detailsPath({
            pathname,
            record,
          }));
          return;
        }
        push(`${this.props.detailsPath || pathname}/${record.id}`);
      },
    };
  }

  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <h1>{ this.props.title }</h1>
          <ButtonList buttons={this.props.buttons} />
          {this.props.filterComponent}
          <Table
            dataSource={this.props.data}
            columns={this.props.columns}
            onRow={this.onRow}
            loading={this.props.loading}
          />
          <Error error={this.props.error} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withRouter(ItemList);
