import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import { withParams } from '../../HOC/withRouter';
import styles from './Product.module.css';

class ProductDetails extends Component {
	static contextType = ProductContext;
	state = {
		activeImage: 0,
		activeAttribute: '',
	};

	render() {
		const {
			products,
			setCartItem,
			showCart,
			setShowCart,
			activeCurrency,
			activeSymbol,
		} = this.context;
		const { id } = this.props.params;
		const product = products?.find(product => product.id === id);
		const productAttribute = product?.attributes[0]?.name;
		const cartItem = {
			id: product?.id,
			category: product?.category,
			price: product?.prices.find(price => price.currency === activeCurrency)
				.amount,
		};
		cartItem[productAttribute?.toLowerCase()] = this.state.activeAttribute;
		console.log(product);
		return (
			<div className='container'>
				<div className={styles.product__details}>
					<div className={styles.product__gallery}>
						<div className={styles.product__gallery__navigate}>
							{product?.gallery.map((image, i) => (
								<img
									src={image}
									key={i}
									alt={product.name}
									onClick={() => this.setState({ activeImage: i })}
								/>
							))}
						</div>
						<div className={styles.product__gallery__showCase}>
							<img src={product?.gallery[this.state.activeImage]} alt='' />
						</div>
					</div>
					<div className={styles.product__info}>
						<h1 className={styles.name}>{product?.name}</h1>
						<p className={styles.product__brand}>Brand: {product?.brand}</p>
						<div className={styles.product__attributes}>
							{product?.attributes[0]?.name}
							<p>
								{product?.attributes[0]?.items.map((at, i) =>
									product?.attributes[0]?.name === 'Color' ? (
										<span>
											<button
												style={{
													backgroundColor: at.value,
												}}
												className={
													this.state.activeAttribute === at.value
														? styles.activeColor
														: ''
												}
												key={i}
												onClick={() => {
													this.setState({ activeAttribute: at.value });
												}}></button>
										</span>
									) : (
										<button
											key={i}
											className={
												this.state.activeAttribute === at.value
													? styles.active
													: ''
											}
											onClick={() => {
												this.setState({ activeAttribute: at.value });
											}}>
											{at.value}
										</button>
									)
								)}
							</p>
						</div>
						<h3>Price</h3>
						<h3 className={styles.product__price}>
							{activeSymbol}
							{product?.prices.map((price, i) =>
								price.currency === activeCurrency ? price.amount : ''
							)}
						</h3>
						<button
							className={styles.cart_button}
							onClick={() => {
								this.state.activeAttribute
									? setCartItem(cartItem)
									: alert(`Please select a ${product?.attributes[0].name}`);
							}}>
							Add to Cart
						</button>
						<div
							className={styles.product__description}
							dangerouslySetInnerHTML={{ __html: product?.description }}
						/>
					</div>
				</div>
				{showCart && <div className='wrapper' onClick={setShowCart}></div>}
			</div>
		);
	}
}

export default withParams(ProductDetails);
