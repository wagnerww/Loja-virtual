import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

export default class Home extends Component {
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

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.priceFormatted}</span>
            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
