import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
			activeSymbol,
			setCartItemAttribute,
		} = this.context;

		return (
			<div>
				<p style={{ paddingBottom: '20px' }}>My Bag, {cart.length} items</p>

				<div>
					{cart.length > 0 &&
						cart.map(item => {
							const product = products.filter(
								product => product.category === item.category
							);
							const productItem = product.find(
								product => product.id === item.id
							);
							const productAttribute = productItem?.attributes[0];
							const attributeName = productAttribute?.name.toLowerCase();
							return (
								<div key={item.id} className={styles.cartContainer}>
									<div className={styles.details}>
										<p>{productItem?.name}</p>
										<p>
											{activeSymbol}
											{productItem?.prices?.map(
												(price, i) =>
													price.currency === activeCurrency && price.amount
											)}
										</p>
										<div>
											{productAttribute?.name}
											<p>
												{productAttribute?.items.map((at, i) =>
													attributeName === 'color' ? (
														<span>
															<button
																className={`${styles.attributesColor} ${
																	at.value === item[attributeName]
																		? styles.active
																		: ''
																}`}
																style={{
																	backgroundColor: at.value,
																}}
																key={i}
																onClick={() => {
																	setCartItemAttribute(
																		item,
																		productAttribute.name,
																		at.value
																	);
																}}></button>
														</span>
													) : (
														<button
															className={`${styles.attributes} ${
																at.value === item[attributeName]
																	? styles.active
																	: ''
															}`}
															key={i}
															onClick={() => {
																setCartItemAttribute(
																	item,
																	productAttribute.name,
																	at.value
																);
															}}>
															{at.value}
														</button>
													)
												)}
											</p>
										</div>
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

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h4>Total: </h4>
					<h4 style={{ textAlign: 'right' }}>
						{activeSymbol}
						{cartTotal.toFixed(2)}
					</h4>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: '20px',
					}}>
					<Link to='/cart'>
						<button className={styles.button_bag}>VIEW BAG</button>
					</Link>
					<button className={styles.checkout}>CHECK OUT</button>
				</div>
			</div>
		);
	}
}

export default Cart;
