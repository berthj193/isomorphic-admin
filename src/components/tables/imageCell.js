import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

export default class ImageCell extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({ src: null });
      this.loadImage(this.props.src);
    }
  }

  pendingPool = {};

  readyPool = {};

  loadImage(src) {
    if (this.readyPool[src]) {
      this.setState({ src });
      return;
    }

    if (this.pendingPool[src]) {
      this.pendingPool[src].push(this.onLoadImage);
      return;
    }
    this.pendingPool[src] = [this.onLoadImage];

    const img = new Image();
    img.onload = () => {
      this.pendingPool[src].forEach(callback => {
        callback(src);
      });
      delete this.pendingPool[src];
      img.onload = null;
      src = null;
    };
    img.src = src;
  }

  onLoadImage(src) {
    this.readyPool[src] = true;
    if (src === this.props.src) {
      this.setState({
        src,
      });
    }
  }

  render() {
    const style = this.state.src
      && {
        backgroundImage: `url(${this.state.src})`,
        width: '70px',
        height: '70px',
        backgroundSize: 'cover',
      };
    return <div className="exampleImage" style={style} />;
  }
}
