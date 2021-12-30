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
		const exists = this.state.cart.find(cartItem => cartItem.id === item.id);
		if (exists) {
			this.setState({
				cart: this.state.cart.map(cartItem => {
					if (cartItem.id === item.id) {
						cartItem.count += 1;
						cartItem.total = cartItem.count * cartItem.price;
					}
					return cartItem;
				}),
			});
		} else {
			item.count = 1;
			item.total = item.price;
			this.setState({
				cart: [...this.state.cart, item],
			});
		}
	};

	increaseCount = id => {
		this.setState({
			cart: this.state.cart.map(cartItem => {
				if (cartItem.id === id) {
					cartItem.count += 1;
					cartItem.total = cartItem.count * cartItem.price;
				}
				return cartItem;
			}),
		});
	};

	decreaseCount = id => {
		this.setState({
			cart: this.state.cart.map(cartItem => {
				if (cartItem.id === id) {
					cartItem.count -= 1;
					cartItem.total = cartItem.count * cartItem.price;
				}
				return cartItem;
			}),
		});
	};

	removeCartItem = cartItem => {
		let tempCart = [...this.state.cart];
		tempCart = tempCart.filter(item => item.id !== cartItem.id);
		let total = 0;
		tempCart.map(item => (total += item.price));

		this.setState({ cart: tempCart, cartTotal: total });
	};

	render() {
		const {
			categories,
			activeCategory,
			products,
			currencies,
			activeCurrency,
			cart,
			cartTotal,
		} = this.state;
		const {
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
			setActiveCategory,
		} = this;
		const value = {
			categories,
			activeCategory,
			products,
			currencies,
			activeCurrency,
			cart,
			cartTotal,
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
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
