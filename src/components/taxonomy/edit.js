import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TaxonomyForm from './form';

import withReduxForm from '../formWrapper/withReduxForm';
import Button from '../uielements/button';

const Form = withReduxForm({
  form: 'editTaxonomy',
  enableReinitialize: true,
})(TaxonomyForm);

export default class EditTaxonomy extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func,
  };

  handleDelete = () => {
    const { id, onDelete } = this.props;
    return onDelete && onDelete(id);
  };

  render() {
    const { onDelete, ...otherProps } = this.props;
    return (
      <div className="edit-taxonomy">
        <h2>Edit Taxonomy</h2>
        <Form {...otherProps}>
          { onDelete && <Button className="delete-taxonomy" onClick={this.handleDelete}>Delete</Button>}
        </Form>
      </div>
    );
  }
}
