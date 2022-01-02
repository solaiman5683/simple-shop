import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../Contexts/ProductContext';
import styles from './Cart.module.css';

class CartPage extends Component {
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
			showCart,
			setShowCart,
		} = this.context;
		return (
			<div className={styles.cart__container}>
				<h1 style={{ margin: '2em 0' }}>Cart</h1>
				<p>My Bag, {cart.length} items</p>

				<div>
					{cart.length > 0 &&
						cart.map(item => {
							const product = products.filter(
								product => product.category === item.category
							);
							const productItem = product.find(
								product => product.id === item.id
							);
							const productAttribute = productItem.attributes[0];
							const attributeName = productAttribute?.name.toLowerCase();
							console.log(attributeName);
							return (
								<div key={item.id} className={styles.cart__page__container}>
									<div className={styles.cart__details}>
										<h2>{productItem?.name}</h2>
										<p style={{ fontSize: '1.2rem' }}>{productItem?.brand}</p>
										<h3>
											{activeSymbol}
											{productItem?.prices?.map(
												(price, i) =>
													price.currency === activeCurrency && price.amount
											)}
										</h3>
										<div>
											<h4>{productAttribute?.name}</h4>
											<p>
												{productAttribute?.items.map((at, i) =>
													attributeName === 'color' ? (
														<span>
															<button
																className={`${styles.item__attributes__color} ${
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
															className={`${styles.item__attributes} ${
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
									<div className={styles.item__count}>
										<button onClick={() => increaseCount(item.id)}>+</button>
										<span>{item.count}</span>
										<button onClick={() => decreaseCount(item.id)}>-</button>
									</div>
									<div className={styles.item__image}>
										<img src={productItem.gallery[0]} alt={productItem.name} />
									</div>
								</div>
							);
						})}
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						fontSize: '1.3rem',
					}}>
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
					<span></span>
					<Link to='/checkout'>
						<button className={styles.checkout}>CHECK OUT</button>
					</Link>
				</div>

				{showCart && (
					<div
						className='wrapper'
						// style={{ height: `${window.innerHeight}px` }}
						onClick={setShowCart}></div>
				)}
			</div>
		);
	}
}

export default CartPage;
