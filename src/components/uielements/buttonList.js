import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './button';

import './styles/buttonlist.scss';

class ButtonList extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    buttons: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          title: PropTypes.node,
          link: PropTypes.string,
          onClick: PropTypes.func,
          type: PropTypes.string,
          ghost: PropTypes.bool,
          disabled: PropTypes.bool,
          key: PropTypes.string,
        }),
        PropTypes.func,
      ]),
    ),
  };

  static defaultProps = {
    buttons: [],
  };

  static getComponent(button) {
    const { title, link } = button;
    if (!link && !title) {
      return button;
    }
    return (
      <Button
        key={button.key || button.title}
        onClick={button.onClick}
        type={button.type}
        ghost={button.ghost}
        disabled={button.disabled}
      >
        {
          button.link
            ? <Link to={button.link}>{button.title}</Link>
            : button.title
        }
      </Button>
    );
  }

  render() {
    const buttonList = this.props.buttons.map(ButtonList.getComponent);

    return (
      <div className="button-list">
        {buttonList}
      </div>
    );
  }
}

export default ButtonList;
