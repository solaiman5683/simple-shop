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
		activeSymbol: '$',
		cart: [],
		cartCount: 0,
		showCart: false,
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
		this.setState({
			activeCurrency: currency,
			activeSymbol:
				currency === 'USD'
					? `$`
					: currency === 'GBP'
					? `£`
					: currency === 'AUD'
					? `$`
					: currency === 'JPY'
					? `¥`
					: currency === 'RUB'
					? `₽`
					: '',
		});
	};
	setCartItem = item => {
		let total = this.state.cartTotal;
		const exists = this.state.cart.find(cartItem => cartItem.id === item.id);
		if (exists) {
			this.setState({
				cart: this.state.cart.map(cartItem => {
					if (cartItem.id === item.id) {
						cartItem.count += 1;
						total += cartItem.count * cartItem.price;
					}
					return cartItem;
				}),
				cartCount: this.state.cartCount + 1,
				cartTotal: total,
			});
		} else {
			item.count = 1;
			total += item.price;
			this.setState({
				cart: [...this.state.cart, item],
				cartCount: this.state.cartCount + 1,
				cartTotal: total,
			});
		}
	};

	setCartItemAttribute = (item, attribute, value) => {
		this.setState({
			cart: this.state.cart.map(cartItem => {
				if (cartItem.id === item.id) {
					cartItem[attribute.toLowerCase()] = value;
				}
				return cartItem;
			}),
		});
	};

	increaseCount = id => {
		let total = this.state.cartTotal;
		this.setState({
			cart: this.state.cart.map(cartItem => {
				if (cartItem.id === id) {
					cartItem.count += 1;
					total += cartItem.count * cartItem.price;
				}
				return cartItem;
			}),
			cartCount: this.state.cartCount + 1,
			cartTotal: total,
		});
	};

	decreaseCount = id => {
		let total = this.state.cartTotal;
		const cartItem = this.state.cart.find(cartItem => cartItem.id === id);
		if (cartItem.count <= 1) {
			this.removeCartItem(cartItem);
		} else {
			this.setState({
				cart: this.state.cart.map(cartItem => {
					if (cartItem.id === id) {
						cartItem.count -= 1;
						total += cartItem.count * cartItem.price;
					}
					return cartItem;
				}),
				cartCount: this.state.cartCount - 1,
				cartTotal: total,
			});
		}
	};

	removeCartItem = cartItem => {
		let tempCart = [...this.state.cart];
		tempCart = tempCart.filter(item => item.id !== cartItem.id);
		let total = 0;
		tempCart.map(item => {
			total += item.count * item.price;
			return item;
		});

		this.setState({
			cart: tempCart,
			cartTotal: total,
			cartCount: this.state.cartCount - 1,
		});
	};

	setShowCart = () => {
		this.setState({ showCart: !this.state.showCart });
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
			showCart,
			cartCount,
			activeSymbol,
		} = this.state;
		const {
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
			setActiveCategory,
			increaseCount,
			decreaseCount,
			setShowCart,
			setCartItemAttribute,
		} = this;
		const value = {
			categories,
			activeCategory,
			products,
			currencies,
			activeCurrency,
			cart,
			cartTotal,
			showCart,
			cartCount,
			activeSymbol,
			setCategories,
			setProducts,
			setCurrencies,
			setActiveCurrencies,
			setCartItem,
			removeCartItem,
			setActiveCategory,
			increaseCount,
			decreaseCount,
			setShowCart,
			setCartItemAttribute,
		};
		return (
			<ProductContext.Provider value={value}>
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

export default ProductContext;
