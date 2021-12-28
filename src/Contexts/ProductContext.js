import React, { Component } from 'react';
const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;

export class ProductContextProvider extends Component {
	state = {
		categories: [],
		activeCategory: 'clothes',
		products: [],
		currencies: [],
		activeCurrency: 'USD',
		cart: [],
		cartSubTotal: 0,
		cartTax: 0,
		cartTotal: 0,
	};
	setCategories = categories => {
		this.setState({ categories });
	};
	setActiveCategory = category => {
		this.setState({ activeCategory: category });
	};
	setProducts = products => {
		this.setState({ products });
	};
	setCurrencies = currencies => {
		this.setState({ currencies });
	};
	setActiveCurrencies = currency => {
		this.setState({ activeCurrency: currency });
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
			categories,
			activeCategory,
			products,
			currencies,
			activeCurrency,
			cart,
			cartSubTotal,
			cartTax,
			cartTotal,
		} = this.state;
		const {
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
			setCartSubTotal,
			setCartTax,
			setCartTotal,
			setActiveCategory,
		} = this;
		const value = {
			categories,
			activeCategory,
			products,
			currencies,
			activeCurrency,
			cart,
			cartSubTotal,
			cartTax,
			cartTotal,
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
			setCartSubTotal,
			setCartTax,
			setCartTotal,
			setActiveCategory,
		};
		return (
			<ProductContext.Provider value={value}>
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

export default ProductContext;
