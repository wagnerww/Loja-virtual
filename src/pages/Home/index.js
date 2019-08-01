import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  const [productsState, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, prod) => {
      sumAmount[prod.id] = prod.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      const products = data.map(prod => ({
        ...prod,
        priceFormatted: formatPrice(prod.price),
      }));
      setProducts(products);
    }

    loadProducts();
  }, []);

  function handleAddProduct(product) {
    dispatch(CartActions.addToCardRequest(product.id));
  }

  return (
    <ProductList>
      {productsState.map(prod => (
        <li key={prod.id}>
          <img src={prod.image} alt={prod.title} />
          <strong>{prod.title}</strong>
          <span>{prod.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(prod)}>
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
