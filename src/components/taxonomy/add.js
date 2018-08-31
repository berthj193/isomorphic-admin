import React from 'react';
import PropTypes from 'prop-types';

import TaxonomyForm from './form';

import withReduxForm from '../formWrapper/withReduxForm';

const Form = withReduxForm({
  form: 'createTaxonomy',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
})(TaxonomyForm);

export default function AddTaxonomy({ parent, ...otherProps }) {
  return (
    <div className="add-taxonomy">
      <h2>Create Taxonomy</h2>
      <Form {...otherProps}>
        <span>Parent: {parent && parent.name}</span>
      </Form>
    </div>
  );
}

AddTaxonomy.propTypes = {
  parent: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};
