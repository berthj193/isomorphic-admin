import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../uielements/button';

export class GoBackButton extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Button onClick={this.goBack}>
          Go Back
      </Button>
    );
  }
}

export default withRouter(GoBackButton);
