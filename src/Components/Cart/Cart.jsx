import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import styles from './Cart.module.css';

class Cart extends Component {
	static contextType = ProductContext;
	render() {
		const {
			cart,
			products,
			activeCurrency,
			increaseCount,
			decreaseCount,
			cartTotal,
		} = this.context;

		console.log(cart);
		return (
			<div>
				<p>My Bag, {cart.length} items</p>

				<div>
					{cart.length > 0 &&
						cart.map(item => {
							const product = products.find(
								product => product.name === item.category
							);
							const productItem = product.products.find(
								product => product.id === item.id
							);
							// console.log(productItem);
							return (
								<div key={item.id} className={styles.cartContainer}>
									<div className={styles.details}>
										<p>{productItem?.name}</p>
										<p>
											{productItem.prices?.map(
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
											{
												productItem?.prices.find(
													i => i.currency === activeCurrency
												).amount
											}
										</p>
									</div>
									<div className={styles.count}>
										<button onClick={() => increaseCount(item.id)}>+</button>
										<span>{item.count}</span>
										<button onClick={() => decreaseCount(item.id)}>-</button>
									</div>
									<div className={styles.image}>
										<img src={productItem.gallery[0]} alt={productItem.name} />
									</div>
								</div>
							);
						})}
				</div>

				<h4>Total: {cartTotal.toFixed(2)}</h4>
			</div>
		);
	}
}

export default Cart;
