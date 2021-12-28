import React, { Component } from 'react';
const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;

export class ProductContextProvider extends Component {
	state = {
		category: '',
		products: [],
		currency: 'usd',
		cart: [],
		cartSubTotal: 0,
		cartTax: 0,
		cartTotal: 0,
	};
	setCategory = category => {
		this.setState({ category });
	};
	setProducts = products => {
		this.setState({ products });
	};
	setCurrency = currency => {
		this.setState({ currency: currency });
	};
	setCartItem = item => {
		let tempCart = [...this.state.cart];
		tempCart.push(item);
		this.setState({ cart: tempCart });
	};
	removeCartItem = cartItem => {
		let tempCart = [...this.state.cart];
		tempCart = tempCart.filter(item => item.id !== cartItem.id);
		this.setState({ cart: tempCart });
	};
	setCartSubTotal = () => {
		let subTotal = 0;
		this.state.cart.map(item => {
			subTotal += item.price;
			return subTotal;
		});
		this.setState({ cartSubTotal: subTotal });
	};
	setCartTax = () => {
		let tax = 0;
		if (this.state.cartSubTotal > 0) {
			tax = this.state.cartSubTotal * 0.2;
		}
		this.setState({ cartTax: tax });
	};
	setCartTotal = () => {
		let total = this.state.cartSubTotal + this.state.cartTax;
		this.setState({ cartTotal: total });
	};
	render() {
		const {
			category,
			products,
			currency,
			cart,
			cartSubTotal,
			cartTax,
			cartTotal,
		} = this.state;
		const {
			setCategory,
			setProducts,
			setCurrency,
			setCartItem,
			removeCartItem,
			setCartSubTotal,
			setCartTax,
			setCartTotal,
		} = this;
		const value = {
			category,
			products,
			currency,
			cart,
			cartSubTotal,
			cartTax,
			cartTotal,
			setCategory,
			setProducts,
			setCurrency,
			setCartItem,
			removeCartItem,
			setCartSubTotal,
			setCartTax,
			setCartTotal,
		};
		return (
			<ProductContext.Provider value={value}>
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

export default ProductContext;
