import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
// import SingleCart from '../../components/cart/singleCartModal';
// import ecommerceAction from '../../redux/ecommerce/actions';

let totalPrice = 0;

class TopbarAddToCart extends Component {
  static propTypes = {
    viewTopbarCart: PropTypes.bool,
    loadingInitData: PropTypes.bool,
    changeViewTopbarCart: PropTypes.func,
    changeProductQuantity: PropTypes.func,
    initData: PropTypes.func,
    url: PropTypes.string,
    productQuantity: PropTypes.arrayOf(
      PropTypes.shape({
        objectID: PropTypes.string,
        quantity: PropTypes.number,
      }),
    ),
    products: PropTypes.shape({
      price: PropTypes.number,
    }),
    customizedTheme: PropTypes.shape({
      textColor: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const { loadingInitData, initData } = this.props;
    if (!loadingInitData) {
      initData();
    }
  }

  hide() {
    this.props.changeViewTopbarCart(false);
  }

  handleVisibleChange() {
    this.props.changeViewTopbarCart(!this.props.viewTopbarCart);
  }

  changeQuantity(objectID, quantity) {
    const { productQuantity } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          objectID,
          quantity,
        });
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  cancelQuantity(objectID) {
    const { productQuantity } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  renderProducts() {
    const { productQuantity, products } = this.props;
    totalPrice = 0;
    if (!productQuantity || productQuantity.length === 0) {
      return (
        <div className="isoNoItemMsg">
          <span>No item found</span>
        </div>
      );
    }
    return productQuantity.map(product => {
      totalPrice += product.quantity * products[product.objectID].price;
      return (
        <div key={product.objectID}>
          CART ITEM
        </div>
      );
    });
  }

  render() {
    const {
      url,
      productQuantity,
      viewTopbarCart,
      customizedTheme,
    } = this.props;
    const content = (
      <div className="topbarAddtoCart isoDropdownWrapper">
        <div className="isoDropdownHeader">
          <h3>
            {'Cart'}
          </h3>
        </div>
        <div className="isoDropdownBody isoCartItemsWrapper">
          {this.renderProducts()}
        </div>
        <div className="isoDropdownFooterLinks">
          <Link to={`${url}/cart`} onClick={this.hide}>
            {'View Cart'}
          </Link>

          <h3>
            {'Total Price'}
            <span>${totalPrice.toFixed(2)}</span>
          </h3>
        </div>
      </div>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={viewTopbarCart}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-cart"
            style={{ color: customizedTheme.textColor }}
          />
          {productQuantity.length === 0 ? (
            ''
          ) : (
            <span>{productQuantity.length}</span>
          )}
        </div>
      </Popover>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.Ecommerce.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  };
}
export default connect(mapStateToProps, null)(TopbarAddToCart);
