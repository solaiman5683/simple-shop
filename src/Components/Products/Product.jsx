import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import styles from './Product.module.css';

class Product extends Component {
	static contextType = ProductContext;
	render() {
		const { setCartItem } = this.context;
		const { product, activeCurrency } = this.props;
		const cartItem = {
			id: product.id,
			category: product.category,
			price: product.prices.find(price => price.currency === activeCurrency)
				.amount,
		};
		return (
			<div className={styles.products__item}>
				<div
					className={styles.products__item__image}
					style={{
						backgroundImage: `url("${product.gallery[0]}")`,
					}}></div>
				<div className={styles.products__item__information}>
					<h3>{product?.name}</h3>
					<p>
						{product.prices?.map(
							(price, i) =>
								price.currency === activeCurrency &&
								(price.currency === 'USD'
									? `$ ${price.amount}`
									: price.currency === 'GBP'
									? `£ ${price.amount}`
									: price.currency === 'AUD'
									? `$ ${price.amount}`
									: price.currency === 'JPY'
									? `¥ ${price.amount}`
									: price.currency === 'RUB'
									? `₽ ${price.amount}`
									: '')
						)}
					</p>
					<span
						className={styles.cart__button}
						onClick={() => setCartItem(cartItem)}>
						<img src='/assets/images/icons/cart-light.svg' alt='' />
					</span>
				</div>
			</div>
		);
	}
}

export default Product;
