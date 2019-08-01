import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const { data } = await api.get('/products');
    const products = data.map(prod => ({
      ...prod,
      priceFormatted: formatPrice(prod.price),
    }));
    this.setState({ products });
  }

  handleAddProduct = product => {
    const { addToCardRequest } = this.props;

    addToCardRequest(product.id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProduct(prod)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[prod.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, prod) => {
    amount[prod.id] = prod.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
