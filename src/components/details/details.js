import React from 'react';
import PropTypes from 'prop-types';
import Form, { FormItem, FormDivider } from '../uielements/form';
import './details.scss';

class PageDetails extends React.Component {
  static propTypes = {
    details: PropTypes.arrayOf(PropTypes
      .oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool])
    ).isRequired,
  };

  renderDetails = () =>
    this.props.details.map((item, index) => {
      if (!item) {
        return null;
      }
      if (item === 'divider' || item === '---') {
        return <FormDivider key={index} />;
      }

      const [key, value] = Object.entries(item)[0];

      return (
        <FormItem label={key} key={index}>
          <span>
            {
              typeof value !== 'function'
                ? value
                : value()
            }
          </span>
        </FormItem>
      );
    });

  render() {
    return (
      <Form className="details-page">
        {this.renderDetails()}
      </Form>
    );
  }
}

export default PageDetails;
